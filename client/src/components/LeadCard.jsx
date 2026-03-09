import React from 'react';

const LeadCard = ({ title, count, icon: Icon, color }) => {
  const getColors = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'yellow': return 'bg-amber-50 text-amber-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{count}</h3>
        </div>
        <div className={`p-3 rounded-xl ${getColors(color)}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
