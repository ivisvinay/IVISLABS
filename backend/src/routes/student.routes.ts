import { Router } from 'express';
import { authenticate, requireUserType } from '../middleware/auth';
import * as studentController from '../controllers/student.controller';

const router = Router();

// All routes require student authentication
router.use(authenticate, requireUserType('student'));

router.get('/profile', async (req, res, next) => {
  try {
    await studentController.getProfile(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/profile', async (req, res, next) => {
  try {
    await studentController.updateProfile(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/profile/resume', async (req, res, next) => {
  try {
    await studentController.uploadResume(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/notifications', async (req, res, next) => {
  try {
    await studentController.getStudentNotifications(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
