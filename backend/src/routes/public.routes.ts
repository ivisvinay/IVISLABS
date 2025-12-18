import { Router } from 'express';
import * as publicController from '../controllers/public.controller';

const router = Router();

router.get('/problems', async (req, res, next) => {
  try {
    await publicController.getPublicProblems(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/problems/:id', async (req, res, next) => {
  try {
    await publicController.getPublicProblem(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/submissions', async (req, res, next) => {
  try {
    await publicController.getPublicSubmissions(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (req, res, next) => {
  try {
    await publicController.getLeaderboard(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/stats', async (req, res, next) => {
  try {
    await publicController.getPlatformStats(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
