import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError } from '../utils/errors';
import { generatePresignedUrl, getS3Url } from '../services/s3.service';
import { v4 as uuidv4 } from 'uuid';
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  deleteNotification,
} from '../services/notification.service';

export const getProfile = async (req: AuthRequest, res: Response) => {
  const result = await query('SELECT * FROM students WHERE user_id = $1', [req.user!.userId]);

  if (result.rows.length === 0) {
    throw new NotFoundError('Student profile not found');
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const {
    fullName,
    college,
    graduationYear,
    phone,
    githubUrl,
    linkedinUrl,
    bio,
    skills,
    isProfilePublic,
  } = req.body;

  const result = await query(
    `UPDATE students
     SET full_name = COALESCE($1, full_name),
         college = COALESCE($2, college),
         graduation_year = COALESCE($3, graduation_year),
         phone = COALESCE($4, phone),
         github_url = COALESCE($5, github_url),
         linkedin_url = COALESCE($6, linkedin_url),
         bio = COALESCE($7, bio),
         skills = COALESCE($8, skills),
         is_profile_public = COALESCE($9, is_profile_public)
     WHERE user_id = $10
     RETURNING *`,
    [
      fullName,
      college,
      graduationYear,
      phone,
      githubUrl,
      linkedinUrl,
      bio,
      skills ? JSON.stringify(skills) : null,
      isProfilePublic,
      req.user!.userId,
    ]
  );

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const uploadResume = async (req: AuthRequest, res: Response) => {
  const { contentType } = req.body;

  const key = `resumes/${uuidv4()}.pdf`;
  const presignedUrl = await generatePresignedUrl(key, contentType);
  const resumeUrl = getS3Url(key);

  // Update student resume URL
  await query('UPDATE students SET resume_url = $1 WHERE user_id = $2', [
    resumeUrl,
    req.user!.userId,
  ]);

  res.json({
    success: true,
    data: {
      uploadUrl: presignedUrl,
      resumeUrl,
    },
  });
};

export const getStudentNotifications = async (req: AuthRequest, res: Response) => {
  const notifications = await getNotifications(req.user!.userId);
  const unreadCount = await getUnreadCount(req.user!.userId);

  res.json({
    success: true,
    data: {
      notifications,
      unreadCount,
    },
  });
};

export const markNotificationAsRead = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await markAsRead(id, req.user!.userId);

  res.json({
    success: true,
    message: 'Notification marked as read',
  });
};

export const deleteNotificationById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await deleteNotification(id, req.user!.userId);

  res.json({
    success: true,
    message: 'Notification deleted',
  });
};
