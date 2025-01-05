import React from 'react';

interface StatusBadgeProps {
  status: 'up' | 'down' | 'unknown' | 'filtered';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'up':
        return 'bg-green-100 text-green-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      case 'filtered':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyles()} ${className}`}>
      {status}
    </span>
  );
}