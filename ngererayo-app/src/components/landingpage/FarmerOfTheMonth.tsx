// components/FarmerOfTheMonth.tsx
import React from 'react';

const FarmerOfTheMonth: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 text-center border border-[var(--division-bg-color)]">
      <h3 className="text-lg font-bold mb-3">Farmer of the Month</h3>
      <img
        src="/hero.jpg"
        alt="Farmer"
        className="w-20 h-20 mx-auto rounded-full mb-2"
      />
      <h4 className="font-bold text-gray-800">Marie Uwimana</h4>
      <p className="text-xs text-gray-500 mb-1">Nyamasheke District</p>
      <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</p>
      <p className="text-xs text-gray-500 mt-1">Agripreneur with quality produce</p>
      <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700">
        View Products
      </button>
    </div>
  );
};

export default FarmerOfTheMonth;
