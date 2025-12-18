import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('userType').isIn(['company', 'student']),
    validate,
  ],
  async (req, res, next) => {
    try {
      await authController.register(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty(), validate],
  async (req, res, next) => {
    try {
      await authController.login(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', async (req, res, next) => {
  try {
    await authController.logout(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/me', authenticate, async (req, res, next) => {
  try {
    await authController.getMe(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
