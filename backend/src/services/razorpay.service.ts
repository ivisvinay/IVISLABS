import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export const createOrder = async (amount: number, receiptId: string) => {
  const options = {
    amount: amount, // Amount in paise
    currency: 'INR',
    receipt: receiptId,
  };

  return await razorpay.orders.create(options);
};

export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  const text = `${orderId}|${paymentId}`;
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(text)
    .digest('hex');

  return generatedSignature === signature;
};
