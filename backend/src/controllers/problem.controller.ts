import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError, ValidationError, AuthorizationError } from '../utils/errors';

export const createProblem = async (req: AuthRequest, res: Response) => {
  const { title, description, requirements, prizeAmount, deadline, category, techStack } = req.body;

  // Get company ID
  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  // Create problem
  const result = await query(
    `INSERT INTO problems (company_id, title, description, requirements, prize_amount, deadline, category, tech_stack)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [companyId, title, description, requirements, prizeAmount, deadline, category, JSON.stringify(techStack || [])]
  );

  // Give 2 bonus credits
  await query(
    'UPDATE companies SET credit_balance = credit_balance + 2 WHERE id = $1',
    [companyId]
  );

  await query(
    `INSERT INTO credit_transactions (company_id, transaction_type, credits_amount, description)
     VALUES ($1, 'bonus', 2, 'Bonus for posting a problem')`,
    [companyId]
  );

  res.status(201).json({
    success: true,
    data: result.rows[0],
  });
};

export const getProblems = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 20, status, category } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let queryText = 'SELECT p.*, c.company_name FROM problems p JOIN companies c ON p.company_id = c.id';
  const queryParams: any[] = [];
  const conditions: string[] = [];

  if (req.user?.userType === 'company') {
    const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
      req.user.userId,
    ]);
    conditions.push(`p.company_id = $${queryParams.length + 1}`);
    queryParams.push(companyResult.rows[0].id);
  } else {
    // Students only see active problems
    conditions.push(`p.status = 'active'`);
  }

  if (status) {
    conditions.push(`p.status = $${queryParams.length + 1}`);
    queryParams.push(status);
  }

  if (category) {
    conditions.push(`p.category = $${queryParams.length + 1}`);
    queryParams.push(category);
  }

  if (conditions.length > 0) {
    queryText += ' WHERE ' + conditions.join(' AND ');
  }

  queryText += ` ORDER BY p.created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
  queryParams.push(Number(limit), offset);

  const result = await query(queryText, queryParams);

  res.json({
    success: true,
    data: result.rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
    },
  });
};

export const getProblem = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const result = await query(
    `SELECT p.*, c.company_name, c.logo_url, c.website
     FROM problems p
     JOIN companies c ON p.company_id = c.id
     WHERE p.id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError('Problem not found');
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const updateProblem = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, requirements, deadline, status, category, techStack } = req.body;

  // Check ownership
  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  const problemResult = await query('SELECT * FROM problems WHERE id = $1 AND company_id = $2', [
    id,
    companyId,
  ]);

  if (problemResult.rows.length === 0) {
    throw new NotFoundError('Problem not found or unauthorized');
  }

  const result = await query(
    `UPDATE problems
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         requirements = COALESCE($3, requirements),
         deadline = COALESCE($4, deadline),
         status = COALESCE($5, status),
         category = COALESCE($6, category),
         tech_stack = COALESCE($7, tech_stack),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $8
     RETURNING *`,
    [title, description, requirements, deadline, status, category, techStack ? JSON.stringify(techStack) : null, id]
  );

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const deleteProblem = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // Check ownership
  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  // Check if there are submissions
  const submissionsResult = await query('SELECT COUNT(*) FROM submissions WHERE problem_id = $1', [
    id,
  ]);

  if (parseInt(submissionsResult.rows[0].count) > 0) {
    throw new ValidationError('Cannot delete problem with submissions');
  }

  const result = await query('DELETE FROM problems WHERE id = $1 AND company_id = $2 RETURNING *', [
    id,
    companyId,
  ]);

  if (result.rows.length === 0) {
    throw new NotFoundError('Problem not found or unauthorized');
  }

  res.json({
    success: true,
    message: 'Problem deleted successfully',
  });
};

export const closeProblem = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // Check ownership
  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  const result = await query(
    `UPDATE problems SET status = 'closed' WHERE id = $1 AND company_id = $2 RETURNING *`,
    [id, companyId]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError('Problem not found or unauthorized');
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const getProblemSubmissions = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // Check if company owns this problem
  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  const problemResult = await query('SELECT * FROM problems WHERE id = $1 AND company_id = $2', [
    id,
    companyId,
  ]);

  if (problemResult.rows.length === 0) {
    throw new NotFoundError('Problem not found or unauthorized');
  }

  // Get submissions with anonymous IDs
  const result = await query(
    `SELECT s.id, s.anonymous_id, s.github_repo_url, s.demo_url, s.description,
            s.tech_used, s.status, s.submitted_at,
            CASE WHEN pu.id IS NOT NULL THEN true ELSE false END as is_unlocked,
            CASE WHEN pu.id IS NOT NULL THEN st.full_name ELSE NULL END as student_name,
            CASE WHEN pu.id IS NOT NULL THEN st.email ELSE NULL END as student_email,
            CASE WHEN pu.id IS NOT NULL THEN u.email ELSE NULL END as contact_email
     FROM submissions s
     LEFT JOIN profile_unlocks pu ON s.id = pu.submission_id AND pu.company_id = $2
     LEFT JOIN students st ON s.student_id = st.id
     LEFT JOIN users u ON st.user_id = u.id
     WHERE s.problem_id = $1
     ORDER BY s.submitted_at DESC`,
    [id, companyId]
  );

  res.json({
    success: true,
    data: result.rows,
  });
};
