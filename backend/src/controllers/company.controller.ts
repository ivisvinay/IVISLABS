import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError } from '../utils/errors';
import { generatePresignedUrl, getS3Url } from '../services/s3.service';
import { v4 as uuidv4 } from 'uuid';

export const getProfile = async (req: AuthRequest, res: Response) => {
  const result = await query('SELECT * FROM companies WHERE user_id = $1', [req.user!.userId]);

  if (result.rows.length === 0) {
    throw new NotFoundError('Company profile not found');
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const { companyName, industry, website, description } = req.body;

  const result = await query(
    `UPDATE companies
     SET company_name = COALESCE($1, company_name),
         industry = COALESCE($2, industry),
         website = COALESCE($3, website),
         description = COALESCE($4, description)
     WHERE user_id = $5
     RETURNING *`,
    [companyName, industry, website, description, req.user!.userId]
  );

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const uploadLogo = async (req: AuthRequest, res: Response) => {
  const { contentType } = req.body;

  const key = `logos/${uuidv4()}.${contentType.split('/')[1]}`;
  const presignedUrl = await generatePresignedUrl(key, contentType);
  const logoUrl = getS3Url(key);

  // Update company logo URL
  await query('UPDATE companies SET logo_url = $1 WHERE user_id = $2', [
    logoUrl,
    req.user!.userId,
  ]);

  res.json({
    success: true,
    data: {
      uploadUrl: presignedUrl,
      logoUrl,
    },
  });
};

export const getCredits = async (req: AuthRequest, res: Response) => {
  const result = await query('SELECT credit_balance FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);

  res.json({
    success: true,
    data: {
      creditBalance: result.rows[0].credit_balance,
    },
  });
};

export const getTransactions = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  const result = await query(
    `SELECT * FROM credit_transactions
     WHERE company_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [companyId, Number(limit), offset]
  );

  res.json({
    success: true,
    data: result.rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
    },
  });
};

export const getUnlockedProfiles = async (req: AuthRequest, res: Response) => {
  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  const result = await query(
    `SELECT
       pu.unlocked_at,
       s.full_name, s.college, s.graduation_year, s.phone,
       s.github_url, s.linkedin_url, s.resume_url, s.bio, s.skills,
       u.email,
       sub.github_repo_url, sub.demo_url,
       p.title as problem_title
     FROM profile_unlocks pu
     JOIN students s ON pu.student_id = s.id
     JOIN users u ON s.user_id = u.id
     JOIN submissions sub ON pu.submission_id = sub.id
     JOIN problems p ON sub.problem_id = p.id
     WHERE pu.company_id = $1
     ORDER BY pu.unlocked_at DESC`,
    [companyId]
  );

  res.json({
    success: true,
    data: result.rows,
  });
};
