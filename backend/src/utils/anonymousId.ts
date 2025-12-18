import crypto from 'crypto';

export const generateAnonymousId = (): string => {
  const randomBytes = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `Student_${randomBytes}`;
};
