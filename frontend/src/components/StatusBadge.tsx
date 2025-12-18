import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'closed' | 'pending' | 'reviewed' | 'winner' | 'shortlisted' | 'rejected';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    active: { label: 'Active', className: 'bg-green-100 text-green-800' },
    closed: { label: 'Closed', className: 'bg-gray-100 text-gray-800' },
    pending: { label: 'Pending Review', className: 'bg-yellow-100 text-yellow-800' },
    reviewed: { label: 'Reviewed', className: 'bg-blue-100 text-blue-800' },
    winner: { label: 'Winner', className: 'bg-purple-100 text-purple-800' },
    shortlisted: { label: 'Shortlisted', className: 'bg-indigo-100 text-indigo-800' },
    rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};
