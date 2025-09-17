// components/DealCard.tsx
import React from 'react';

type DealCardProps = {
  productName: string;
  price: number;
  unit: string;
  discount: number;
  description: string;
  onBuy: () => void;
};

const DealCard: React.FC<DealCardProps> = ({
  productName,
  price,
  unit,
  discount,
  description,
  onBuy,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 shadow-md w-full max-w-xs">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{description}</span>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          -{discount}%
        </span>
      </div>
      <h3 className="font-semibold text-lg text-green-800">{productName}</h3>
      <p className="text-sm text-gray-600">{price} Rwf/{unit}</p>
      <button
        onClick={onBuy}
        className="bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-md mt-auto"
      >
        Buy Now
      </button>
    </div>
  );
};

export default DealCard;
