import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate, requireUserType } from '../middleware/auth';
import * as creditController from '../controllers/credit.controller';

const router = Router();

router.get('/packages', async (req, res, next) => {
  try {
    await creditController.getCreditPackages(req, res);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/purchase',
  authenticate,
  requireUserType('company'),
  [body('packageId').isUUID(), validate],
  async (req, res, next) => {
    try {
      await creditController.createPurchaseOrder(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/verify',
  authenticate,
  requireUserType('company'),
  [
    body('orderId').notEmpty(),
    body('paymentId').notEmpty(),
    body('signature').notEmpty(),
    body('packageId').isUUID(),
    validate,
  ],
  async (req, res, next) => {
    try {
      await creditController.verifyPayment(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
