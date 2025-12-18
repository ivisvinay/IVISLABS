import { Router } from 'express';
import { authenticate, requireUserType } from '../middleware/auth';
import * as companyController from '../controllers/company.controller';

const router = Router();

// All routes require company authentication
router.use(authenticate, requireUserType('company'));

router.get('/profile', async (req, res, next) => {
  try {
    await companyController.getProfile(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/profile', async (req, res, next) => {
  try {
    await companyController.updateProfile(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/profile/logo', async (req, res, next) => {
  try {
    await companyController.uploadLogo(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/credits', async (req, res, next) => {
  try {
    await companyController.getCredits(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/transactions', async (req, res, next) => {
  try {
    await companyController.getTransactions(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/unlocked-profiles', async (req, res, next) => {
  try {
    await companyController.getUnlockedProfiles(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
