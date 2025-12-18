import { formatDistanceToNow, format } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatTimeAgo = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isDeadlinePassed = (deadline: string): boolean => {
  return new Date(deadline) < new Date();
};

export const getDaysUntilDeadline = (deadline: string): number => {
  const days = Math.ceil(
    (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, days);
};
