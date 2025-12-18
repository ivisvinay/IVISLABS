import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate, requireUserType } from '../middleware/auth';
import * as submissionController from '../controllers/submission.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post(
  '/',
  requireUserType('student'),
  [
    body('problemId').isUUID(),
    body('githubRepoUrl').isURL(),
    validate,
  ],
  async (req, res, next) => {
    try {
      await submissionController.createSubmission(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', requireUserType('student'), async (req, res, next) => {
  try {
    await submissionController.getMySubmissions(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await submissionController.getSubmission(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', requireUserType('student'), async (req, res, next) => {
  try {
    await submissionController.updateSubmission(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireUserType('student'), async (req, res, next) => {
  try {
    await submissionController.deleteSubmission(req, res);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id/review',
  requireUserType('company'),
  [body('status').isIn(['reviewed', 'winner', 'shortlisted', 'rejected']), validate],
  async (req, res, next) => {
    try {
      await submissionController.reviewSubmission(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/unlock', requireUserType('company'), async (req, res, next) => {
  try {
    await submissionController.unlockProfile(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
