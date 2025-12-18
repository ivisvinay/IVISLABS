import { Request, Response } from 'express';
import { query } from '../config/database';

export const getPublicProblems = async (req: Request, res: Response) => {
  const { page = 1, limit = 20, category, minPrize, maxPrize } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let queryText = `
    SELECT p.id, p.title, p.description, p.prize_amount, p.deadline, p.category, p.tech_stack,
           p.created_at, c.company_name, c.logo_url
    FROM problems p
    JOIN companies c ON p.company_id = c.id
    WHERE p.status = 'active'
  `;
  const queryParams: any[] = [];

  if (category) {
    queryParams.push(category);
    queryText += ` AND p.category = $${queryParams.length}`;
  }

  if (minPrize) {
    queryParams.push(Number(minPrize));
    queryText += ` AND p.prize_amount >= $${queryParams.length}`;
  }

  if (maxPrize) {
    queryParams.push(Number(maxPrize));
    queryText += ` AND p.prize_amount <= $${queryParams.length}`;
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

export const getPublicProblem = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await query(
    `SELECT p.*, c.company_name, c.logo_url, c.website, c.industry
     FROM problems p
     JOIN companies c ON p.company_id = c.id
     WHERE p.id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Problem not found',
    });
  }

  // Get submission count
  const submissionCount = await query(
    'SELECT COUNT(*) FROM submissions WHERE problem_id = $1',
    [id]
  );

  const problem = result.rows[0];
  problem.submission_count = parseInt(submissionCount.rows[0].count);

  res.json({
    success: true,
    data: problem,
  });
};

export const getPublicSubmissions = async (req: Request, res: Response) => {
  const { page = 1, limit = 20, status } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let queryText = `
    SELECT s.id, s.github_repo_url, s.demo_url, s.description, s.tech_used,
           s.status, s.submitted_at,
           p.title as problem_title, p.prize_amount,
           c.company_name
    FROM submissions s
    JOIN problems p ON s.problem_id = p.id
    JOIN companies c ON p.company_id = c.id
    WHERE s.status IN ('reviewed', 'winner', 'shortlisted')
  `;
  const queryParams: any[] = [];

  if (status) {
    queryParams.push(status);
    queryText += ` AND s.status = $${queryParams.length}`;
  }

  queryText += ` ORDER BY s.submitted_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
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

export const getLeaderboard = async (req: Request, res: Response) => {
  const { limit = 50 } = req.query;

  const result = await query(
    `SELECT
       s.id, s.full_name, s.college, s.bio, s.github_url, s.linkedin_url, s.skills,
       COUNT(DISTINCT sub.id) FILTER (WHERE sub.status = 'winner') as wins,
       COUNT(DISTINCT sub.id) FILTER (WHERE sub.status = 'shortlisted') as shortlisted,
       COUNT(DISTINCT sub.id) as total_submissions,
       COALESCE(SUM(p.prize_amount) FILTER (WHERE sub.status = 'winner'), 0) as total_winnings
     FROM students s
     LEFT JOIN submissions sub ON s.id = sub.student_id
     LEFT JOIN problems p ON sub.problem_id = p.id
     WHERE s.is_profile_public = true
     GROUP BY s.id
     HAVING COUNT(DISTINCT sub.id) FILTER (WHERE sub.status IN ('winner', 'shortlisted')) > 0
     ORDER BY wins DESC, shortlisted DESC, total_submissions DESC
     LIMIT $1`,
    [Number(limit)]
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getPlatformStats = async (req: Request, res: Response) => {
  const problemsCount = await query('SELECT COUNT(*) FROM problems');
  const submissionsCount = await query('SELECT COUNT(*) FROM submissions');
  const companiesCount = await query('SELECT COUNT(*) FROM companies');
  const studentsCount = await query('SELECT COUNT(*) FROM students');
  const totalPrizes = await query('SELECT COALESCE(SUM(prize_amount), 0) FROM problems WHERE status = \'active\'');

  res.json({
    success: true,
    data: {
      totalProblems: parseInt(problemsCount.rows[0].count),
      totalSubmissions: parseInt(submissionsCount.rows[0].count),
      totalCompanies: parseInt(companiesCount.rows[0].count),
      totalStudents: parseInt(studentsCount.rows[0].count),
      totalPrizes: parseInt(totalPrizes.rows[0].coalesce),
    },
  });
};
