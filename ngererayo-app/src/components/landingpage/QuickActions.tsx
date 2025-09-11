// components/QuickActions.tsx
import React from 'react';
import { FaPlus, FaSearch, FaComments, FaHistory } from 'react-icons/fa';

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
      <div className="space-y-3 text-sm">
        <button className="flex items-center gap-2 text-green-600 font-medium hover:underline">
          <FaPlus /> List Product
        </button>
        <button className="flex items-center gap-2 text-yellow-600 font-medium hover:underline">
          <FaSearch /> Search Products
        </button>
        <button className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
          <FaComments /> Chat with Farmer
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium hover:underline">
          <FaHistory /> View History
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
