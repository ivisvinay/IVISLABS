import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Problem } from '../types';
import { formatCurrency, formatDate, getDaysUntilDeadline } from '../utils/format';
import { StatusBadge } from './StatusBadge';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  FireIcon
} from '@heroicons/react/24/outline';

interface ProblemCardProps {
  problem: Problem;
  showActions?: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, showActions = true }) => {
  const daysLeft = getDaysUntilDeadline(problem.deadline);
  const isUrgent = daysLeft <= 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-600/20 dark:from-primary/10 dark:to-purple-600/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {problem.logo_url && (
                <img
                  src={problem.logo_url}
                  alt={problem.company_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {problem.company_name}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
              {problem.title}
            </h3>
          </div>
          <StatusBadge status={problem.status} />
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {problem.description}
        </p>

        {/* Category */}
        {problem.category && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
              {problem.category}
            </span>
          </div>
        )}

        {/* Tech Stack */}
        {problem.tech_stack && problem.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {problem.tech_stack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {problem.tech_stack.length > 4 && (
              <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                +{problem.tech_stack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Prize */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl">
              <CurrencyDollarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(problem.prize_amount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Prize</p>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center space-x-2">
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
              isUrgent
                ? 'bg-gradient-to-br from-red-400 to-red-600 animate-pulse'
                : 'bg-gradient-to-br from-blue-400 to-blue-600'
            }`}>
              {isUrgent ? (
                <FireIcon className="w-5 h-5 text-white" />
              ) : (
                <ClockIcon className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <p className={`text-lg font-bold ${
                isUrgent ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
              }`}>
                {daysLeft} days
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Remaining</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {showActions && (
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/problems/${problem.id}`}
              className="block w-full text-center bg-gradient-to-r from-primary to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Challenge
            </Link>
          </motion.div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-purple-600/0 to-primary/0 group-hover:from-primary/5 group-hover:via-purple-600/5 group-hover:to-primary/5 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};
