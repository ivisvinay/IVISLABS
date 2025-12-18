import sgMail from '@sendgrid/mail';
import logger from '../config/logger';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@platform.com';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  try {
    await sgMail.send({
      to,
      from: FROM_EMAIL,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    logger.error('Email sending failed:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, name: string, userType: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Problem Solving Platform! 🎉</h2>
      <p>Hi ${name},</p>
      <p>Thank you for joining our platform as a ${userType}.</p>
      ${userType === 'company'
        ? '<p>You have received 5 free credits to get started. Post your first problem and start discovering talent!</p>'
        : '<p>Browse exciting challenges from top companies and showcase your skills!</p>'
      }
      <a href="${FRONTEND_URL}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 16px;">
        Get Started
      </a>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Welcome to Problem Solving Platform',
    html,
  });
};

export const sendSubmissionNotification = async (
  companyEmail: string,
  companyName: string,
  problemTitle: string
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Submission Received! 📝</h2>
      <p>Hi ${companyName},</p>
      <p>A new solution has been submitted for your problem: <strong>${problemTitle}</strong></p>
      <a href="${FRONTEND_URL}/company/submissions" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 16px;">
        View Submissions
      </a>
    </div>
  `;

  await sendEmail({
    to: companyEmail,
    subject: `New Submission for ${problemTitle}`,
    html,
  });
};

export const sendWinnerNotification = async (
  studentEmail: string,
  studentName: string,
  problemTitle: string,
  prizeAmount: number
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Congratulations! You Won! 🏆</h2>
      <p>Hi ${studentName},</p>
      <p>Congratulations! Your submission for <strong>${problemTitle}</strong> has been selected as the winner!</p>
      <p><strong>Prize: ₹${prizeAmount.toLocaleString()}</strong></p>
      <p>The company will contact you soon regarding the prize and next steps.</p>
      <a href="${FRONTEND_URL}/student/submissions" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 16px;">
        View Your Submissions
      </a>
    </div>
  `;

  await sendEmail({
    to: studentEmail,
    subject: `🏆 You won ${problemTitle}!`,
    html,
  });
};

export const sendProfileUnlockNotification = async (
  studentEmail: string,
  studentName: string,
  companyName: string,
  problemTitle: string
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your Profile Was Unlocked! 🔓</h2>
      <p>Hi ${studentName},</p>
      <p><strong>${companyName}</strong> has unlocked your profile for your submission to <strong>${problemTitle}</strong>.</p>
      <p>They may contact you soon!</p>
      <a href="${FRONTEND_URL}/student/profile" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 16px;">
        View Your Profile
      </a>
    </div>
  `;

  await sendEmail({
    to: studentEmail,
    subject: `${companyName} unlocked your profile`,
    html,
  });
};
