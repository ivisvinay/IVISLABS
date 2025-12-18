import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError, ValidationError } from '../utils/errors';
import { createOrder, verifyPaymentSignature } from '../services/razorpay.service';
import { v4 as uuidv4 } from 'uuid';

export const getCreditPackages = async (req: AuthRequest, res: Response) => {
  const result = await query('SELECT * FROM credit_packages WHERE is_active = true ORDER BY credits ASC');

  res.json({
    success: true,
    data: result.rows,
  });
};

export const createPurchaseOrder = async (req: AuthRequest, res: Response) => {
  const { packageId } = req.body;

  // Get package details
  const packageResult = await query('SELECT * FROM credit_packages WHERE id = $1 AND is_active = true', [
    packageId,
  ]);

  if (packageResult.rows.length === 0) {
    throw new NotFoundError('Credit package not found');
  }

  const creditPackage = packageResult.rows[0];

  // Create Razorpay order
  const receiptId = `receipt_${uuidv4()}`;
  const order = await createOrder(creditPackage.price, receiptId);

  res.json({
    success: true,
    data: {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      credits: creditPackage.credits,
      packageName: creditPackage.name,
    },
  });
};

export const verifyPayment = async (req: AuthRequest, res: Response) => {
  const { orderId, paymentId, signature, packageId } = req.body;

  // Verify signature
  const isValid = verifyPaymentSignature(orderId, paymentId, signature);

  if (!isValid) {
    throw new ValidationError('Invalid payment signature');
  }

  // Get package details
  const packageResult = await query('SELECT * FROM credit_packages WHERE id = $1', [packageId]);
  const creditPackage = packageResult.rows[0];

  // Get company ID
  const companyResult = await query('SELECT id FROM companies WHERE user_id = $1', [
    req.user!.userId,
  ]);
  const companyId = companyResult.rows[0].id;

  // Start transaction
  await query('BEGIN');

  try {
    // Add credits to company
    await query('UPDATE companies SET credit_balance = credit_balance + $1 WHERE id = $2', [
      creditPackage.credits,
      companyId,
    ]);

    // Create transaction record
    await query(
      `INSERT INTO credit_transactions (company_id, transaction_type, credits_amount, payment_id, amount_paid, description)
       VALUES ($1, 'purchase', $2, $3, $4, $5)`,
      [
        companyId,
        creditPackage.credits,
        paymentId,
        creditPackage.price,
        `Purchased ${creditPackage.name} package`,
      ]
    );

    await query('COMMIT');

    // Get updated balance
    const updatedCompany = await query('SELECT credit_balance FROM companies WHERE id = $1', [
      companyId,
    ]);

    res.json({
      success: true,
      data: {
        creditBalance: updatedCompany.rows[0].credit_balance,
        creditsAdded: creditPackage.credits,
      },
      message: 'Payment verified and credits added successfully',
    });
  } catch (error) {
    await query('ROLLBACK');
    throw error;
  }
};
