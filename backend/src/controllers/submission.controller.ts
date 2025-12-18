import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors';
import { generateAnonymousId } from '../utils/anonymousId';
import { sendSubmissionNotification, sendWinnerNotification } from '../services/email.service';
import { createNotification } from '../services/notification.service';

export const createSubmission = async (req: AuthRequest, res: Response) => {
  const { problemId, githubRepoUrl, demoUrl, description, techUsed } = req.body;

  // Get student ID
  const studentResult = await query('SELECT id FROM students WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const studentId = studentResult.rows[0].id;

  // Check if problem exists and is active
  const problemResult = await query('SELECT * FROM problems WHERE id = $1', [problemId]);
  if (problemResult.rows.length === 0) {
    throw new NotFoundError('Problem not found');
  }

  const problem = problemResult.rows[0];
  if (problem.status !== 'active') {
    throw new ValidationError('Problem is not accepting submissions');
  }

  if (new Date(problem.deadline) < new Date()) {
    throw new ValidationError('Submission deadline has passed');
  }

  // Check if already submitted
  const existingSubmission = await query(
    'SELECT * FROM submissions WHERE problem_id = $1 AND student_id = $2',
    [problemId, studentId]
  );

  if (existingSubmission.rows.length > 0) {
    throw new ConflictError('You have already submitted to this problem');
  }

  // Generate anonymous ID
  let anonymousId = generateAnonymousId();
  // Ensure uniqueness
  let exists = await query('SELECT id FROM submissions WHERE anonymous_id = $1', [anonymousId]);
  while (exists.rows.length > 0) {
    anonymousId = generateAnonymousId();
    exists = await query('SELECT id FROM submissions WHERE anonymous_id = $1', [anonymousId]);
  }

  // Create submission
  const result = await query(
    `INSERT INTO submissions (problem_id, student_id, anonymous_id, github_repo_url, demo_url, description, tech_used)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [problemId, studentId, anonymousId, githubRepoUrl, demoUrl, description, JSON.stringify(techUsed || [])]
  );

  // Send notification to company
  const companyResult = await query(
    `SELECT u.email, c.company_name
     FROM companies c
     JOIN users u ON c.user_id = u.id
     WHERE c.id = $1`,
    [problem.company_id]
  );

  if (companyResult.rows.length > 0) {
    const company = companyResult.rows[0];
    await sendSubmissionNotification(company.email, company.company_name, problem.title);
  }

  res.status(201).json({
    success: true,
    data: result.rows[0],
  });
};

export const getMySubmissions = async (req: AuthRequest, res: Response) => {
  const studentResult = await query('SELECT id FROM students WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const studentId = studentResult.rows[0].id;

  const result = await query(
    `SELECT s.*, p.title as problem_title, p.prize_amount, c.company_name
     FROM submissions s
     JOIN problems p ON s.problem_id = p.id
     JOIN companies c ON p.company_id = c.id
     WHERE s.student_id = $1
     ORDER BY s.submitted_at DESC`,
    [studentId]
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getSubmission = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const result = await query(
    `SELECT s.*, p.title as problem_title, p.prize_amount, c.company_name
     FROM submissions s
     JOIN problems p ON s.problem_id = p.id
     JOIN companies c ON p.company_id = c.id
     WHERE s.id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError('Submission not found');
  }

  const submission = result.rows[0];

  // Check access - student can see their own, company can see if they own the problem
  if (req.user?.userType === 'student') {
    const studentResult = await query('SELECT id FROM students WHERE user_id = $1', [
      req.user.userId,
    ]);
    if (submission.student_id !== studentResult.rows[0].id) {
      throw new NotFoundError('Submission not found');
    }
  }

  res.json({
    success: true,
    data: submission,
  });
};

export const updateSubmission = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { githubRepoUrl, demoUrl, description, techUsed } = req.body;

  // Get student ID
  const studentResult = await query('SELECT id FROM students WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const studentId = studentResult.rows[0].id;

  // Check ownership and status
  const submissionResult = await query(
    'SELECT * FROM submissions WHERE id = $1 AND student_id = $2',
    [id, studentId]
  );

  if (submissionResult.rows.length === 0) {
    throw new NotFoundError('Submission not found');
  }

  if (submissionResult.rows[0].status !== 'pending') {
    throw new ValidationError('Cannot update reviewed submission');
  }

  const result = await query(
    `UPDATE submissions
     SET github_repo_url = COALESCE($1, github_repo_url),
         demo_url = COALESCE($2, demo_url),
         description = COALESCE($3, description),
         tech_used = COALESCE($4, tech_used)
     WHERE id = $5
     RETURNING *`,
    [githubRepoUrl, demoUrl, description, techUsed ? JSON.stringify(techUsed) : null, id]
  );

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const deleteSubmission = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // Get student ID
  const studentResult = await query('SELECT id FROM students WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const studentId = studentResult.rows[0].id;

  // Check ownership and status
  const submissionResult = await query(
    'SELECT * FROM submissions WHERE id = $1 AND student_id = $2',
    [id, studentId]
  );

  if (submissionResult.rows.length === 0) {
    throw new NotFoundError('Submission not found');
  }

  if (submissionResult.rows[0].status !== 'pending') {
    throw new ValidationError('Cannot delete reviewed submission');
  }

  await query('DELETE FROM submissions WHERE id = $1', [id]);

  res.json({
    success: true,
    message: 'Submission deleted successfully',
  });
};

export const reviewSubmission = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['reviewed', 'winner', 'shortlisted', 'rejected'].includes(status)) {
    throw new ValidationError('Invalid status');
  }

  // Get company ID
  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  // Check if company owns the problem
  const submissionResult = await query(
    `SELECT s.*, p.company_id, p.title, p.prize_amount
     FROM submissions s
     JOIN problems p ON s.problem_id = p.id
     WHERE s.id = $1`,
    [id]
  );

  if (submissionResult.rows.length === 0) {
    throw new NotFoundError('Submission not found');
  }

  const submission = submissionResult.rows[0];
  if (submission.company_id !== companyId) {
    throw new NotFoundError('Submission not found or unauthorized');
  }

  // Update submission
  const result = await query(
    `UPDATE submissions
     SET status = $1, reviewed_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );

  // If winner, send notification
  if (status === 'winner') {
    const studentResult = await query(
      `SELECT s.full_name, u.email, u.id as user_id
       FROM students s
       JOIN users u ON s.user_id = u.id
       WHERE s.id = $1`,
      [submission.student_id]
    );

    if (studentResult.rows.length > 0) {
      const student = studentResult.rows[0];
      await sendWinnerNotification(
        student.email,
        student.full_name,
        submission.title,
        submission.prize_amount
      );

      await createNotification({
        userId: student.user_id,
        title: '🏆 Congratulations! You Won!',
        message: `Your submission for ${submission.title} has been selected as the winner! Prize: ₹${submission.prize_amount.toLocaleString()}`,
        type: 'winner_announcement',
      });
    }
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const unlockProfile = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // Get company ID and credit balance
  const companyResult = await query(
    'SELECT id, credit_balance FROM companies WHERE user_id = $1',
    [req.user!.userId]
  );
  const company = companyResult.rows[0];

  if (company.credit_balance < 1) {
    throw new ValidationError('Insufficient credits. Please purchase more credits.');
  }

  // Get submission and verify ownership
  const submissionResult = await query(
    `SELECT s.*, p.company_id, p.title
     FROM submissions s
     JOIN problems p ON s.problem_id = p.id
     WHERE s.id = $1`,
    [id]
  );

  if (submissionResult.rows.length === 0) {
    throw new NotFoundError('Submission not found');
  }

  const submission = submissionResult.rows[0];
  if (submission.company_id !== company.id) {
    throw new NotFoundError('Submission not found or unauthorized');
  }

  // Check if already unlocked
  const unlockResult = await query(
    'SELECT * FROM profile_unlocks WHERE company_id = $1 AND submission_id = $2',
    [company.id, id]
  );

  if (unlockResult.rows.length > 0) {
    // Already unlocked, just return the profile
    const studentResult = await query(
      `SELECT s.*, u.email
       FROM students s
       JOIN users u ON s.user_id = u.id
       WHERE s.id = $1`,
      [submission.student_id]
    );

    return res.json({
      success: true,
      data: studentResult.rows[0],
      message: 'Profile already unlocked',
    });
  }

  // Start transaction
  await query('BEGIN');

  try {
    // Deduct credit
    await query('UPDATE companies SET credit_balance = credit_balance - 1 WHERE id = $1', [
      company.id,
    ]);

    // Create transaction record
    await query(
      `INSERT INTO credit_transactions (company_id, transaction_type, credits_amount, description)
       VALUES ($1, 'used', -1, 'Profile unlock for submission ${id}')`,
      [company.id]
    );

    // Create unlock record
    await query(
      `INSERT INTO profile_unlocks (company_id, student_id, submission_id)
       VALUES ($1, $2, $3)`,
      [company.id, submission.student_id, id]
    );

    // Get student profile
    const studentResult = await query(
      `SELECT s.*, u.email
       FROM students s
       JOIN users u ON s.user_id = u.id
       WHERE s.id = $1`,
      [submission.student_id]
    );

    const student = studentResult.rows[0];

    // Send notification
    const companyNameResult = await query('SELECT company_name FROM companies WHERE id = $1', [
      company.id,
    ]);

    await createNotification({
      userId: student.user_id,
      title: '🔓 Profile Unlocked',
      message: `${companyNameResult.rows[0].company_name} has unlocked your profile for your submission to ${submission.title}`,
      type: 'profile_unlock',
    });

    await query('COMMIT');

    res.json({
      success: true,
      data: student,
      message: 'Profile unlocked successfully',
    });
  } catch (error) {
    await query('ROLLBACK');
    throw error;
  }
};
