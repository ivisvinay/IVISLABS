import React from 'react';
import { Link } from 'react-router-dom';
import { Problem } from '../types';
import { formatCurrency, formatDate, getDaysUntilDeadline } from '../utils/format';
import { StatusBadge } from './StatusBadge';

interface ProblemCardProps {
  problem: Problem;
  showActions?: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, showActions = true }) => {
  const daysLeft = getDaysUntilDeadline(problem.deadline);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{problem.company_name}</p>
        </div>
        <StatusBadge status={problem.status} />
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{problem.description}</p>

      {problem.tech_stack && problem.tech_stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {problem.tech_stack.slice(0, 5).map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {tech}
            </span>
          ))}
          {problem.tech_stack.length > 5 && (
            <span className="text-gray-500 text-xs">+{problem.tech_stack.length - 5} more</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <p className="text-2xl font-bold text-primary">{formatCurrency(problem.prize_amount)}</p>
          <p className="text-sm text-gray-500">Prize Amount</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">{daysLeft} days</p>
          <p className="text-sm text-gray-500">Remaining</p>
        </div>
      </div>

      {showActions && (
        <div className="mt-4">
          <Link
            to={`/problems/${problem.id}`}
            className="block w-full text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};
