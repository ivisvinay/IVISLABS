import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as studentController from '../controllers/student.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.put('/:id/read', async (req, res, next) => {
  try {
    await studentController.markNotificationAsRead(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await studentController.deleteNotificationById(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
