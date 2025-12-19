import React from 'react';
import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'active' | 'closed' | 'pending' | 'reviewed' | 'winner' | 'shortlisted' | 'rejected';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    active: {
      label: 'Active',
      className: 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
    },
    closed: {
      label: 'Closed',
      className: 'bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800/30 dark:to-slate-800/30 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
    },
    pending: {
      label: 'Pending',
      className: 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
    },
    reviewed: {
      label: 'Reviewed',
      className: 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
    },
    winner: {
      label: 'Winner',
      className: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 animate-glow'
    },
    shortlisted: {
      label: 'Shortlisted',
      className: 'bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
    },
    rejected: {
      label: 'Rejected',
      className: 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
    },
  };

  const config = statusConfig[status];

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </motion.span>
  );
};
