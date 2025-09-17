// components/QuickActions.tsx
import React from 'react';
import { FaPlus, FaSearch, FaComments, FaHistory } from 'react-icons/fa';

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <h3 className="text-lg mb-3 font-extrabold">Quick Actions</h3>
      <div className="space-y-3 text-sm">
        <button className="flex w-full bg-[var(--green-bg-color)] items-center gap-2 text-white p-3 rounded-2xl font-medium hover:underline">
          <FaPlus /> List Product
        </button>
        <button className="flex w-full bg-[var(--yellow-bg-color)] items-center gap-2 text-white p-3 rounded-2xl font-medium hover:underline">
          <FaSearch /> Search Products
        </button>
        <button className="flex w-full bg-[var(--bold-green-bg)] items-center gap-2 text-white p-3 rounded-2xl  font-medium hover:underline">
          <FaComments /> Chat with Farmer
        </button>
        <button className="flex w-full bg-[var(--bold-green-bg)] items-center gap-2 text-white p-3 rounded-2xl  font-medium hover:underline">
          <FaHistory /> View History
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
