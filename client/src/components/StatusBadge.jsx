import React from 'react';

const StatusBadge = ({ status }) => {
  const getStyles = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'contacted':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'converted':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles(status)} capitalize`}>
      {status}
    </span>
  );
};

export default StatusBadge;
