import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate, requireUserType } from '../middleware/auth';
import * as problemController from '../controllers/problem.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post(
  '/',
  requireUserType('company'),
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('prizeAmount').isInt({ min: 1 }),
    body('deadline').isISO8601(),
    validate,
  ],
  async (req, res, next) => {
    try {
      await problemController.createProblem(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    await problemController.getProblems(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await problemController.getProblem(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', requireUserType('company'), async (req, res, next) => {
  try {
    await problemController.updateProblem(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireUserType('company'), async (req, res, next) => {
  try {
    await problemController.deleteProblem(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/close', requireUserType('company'), async (req, res, next) => {
  try {
    await problemController.closeProblem(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/submissions', requireUserType('company'), async (req, res, next) => {
  try {
    await problemController.getProblemSubmissions(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
