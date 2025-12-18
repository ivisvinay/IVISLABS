import { Response } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../config/database';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { ValidationError, AuthenticationError, ConflictError } from '../utils/errors';
import { sendWelcomeEmail } from '../services/email.service';

export const register = async (req: AuthRequest, res: Response) => {
  const { email, password, userType, ...profileData } = req.body;

  // Check if user already exists
  const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    throw new ConflictError('Email already registered');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Start transaction
  const client = await query('BEGIN');

  try {
    // Create user
    const userResult = await query(
      'INSERT INTO users (email, password_hash, user_type) VALUES ($1, $2, $3) RETURNING *',
      [email, passwordHash, userType]
    );
    const user = userResult.rows[0];

    // Create profile based on user type
    if (userType === 'company') {
      await query(
        `INSERT INTO companies (user_id, company_name, industry, website, description)
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, profileData.companyName, profileData.industry, profileData.website, profileData.description]
      );
      await sendWelcomeEmail(email, profileData.companyName, 'company');
    } else if (userType === 'student') {
      await query(
        `INSERT INTO students (user_id, full_name, college, graduation_year, phone, bio, skills)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [user.id, profileData.fullName, profileData.college, profileData.graduationYear, profileData.phone, profileData.bio, JSON.stringify(profileData.skills || [])]
      );
      await sendWelcomeEmail(email, profileData.fullName, 'student');
    }

    await query('COMMIT');

    const token = generateToken({
      userId: user.id,
      email: user.email,
      userType: user.user_type,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          userType: user.user_type,
        },
        token,
      },
    });
  } catch (error) {
    await query('ROLLBACK');
    throw error;
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  // Find user
  const userResult = await query('SELECT * FROM users WHERE email = $1', [email]);
  if (userResult.rows.length === 0) {
    throw new AuthenticationError('Invalid email or password');
  }

  const user = userResult.rows[0];

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    throw new AuthenticationError('Invalid email or password');
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    userType: user.user_type,
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        userType: user.user_type,
      },
      token,
    },
  });
};

export const logout = async (req: AuthRequest, res: Response) => {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AuthenticationError();
  }

  const userResult = await query('SELECT id, email, user_type FROM users WHERE id = $1', [
    req.user.userId,
  ]);

  if (userResult.rows.length === 0) {
    throw new AuthenticationError();
  }

  const user = userResult.rows[0];
  let profile = null;

  if (user.user_type === 'company') {
    const companyResult = await query('SELECT * FROM companies WHERE user_id = $1', [user.id]);
    profile = companyResult.rows[0];
  } else {
    const studentResult = await query('SELECT * FROM students WHERE user_id = $1', [user.id]);
    profile = studentResult.rows[0];
  }

  res.json({
    success: true,
    data: {
      user,
      profile,
    },
  });
};
