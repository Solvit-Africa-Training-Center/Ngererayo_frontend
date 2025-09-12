// components/CategoryCard.tsx
import React from 'react';

type CategoryCardProps = {
  title: string;
  description: string;
  productCount: number;
  image: string;
  bgClass?: string; // Tailwind class for background color
  onClick?: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  productCount,
  image,
  bgClass = 'bg-white',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${bgClass} border shadow-xl/20 border-gray-200 hover:shadow-lg rounded-xl p-5 w-full sm:w-[180px] text-center flex flex-col justify-between transition-all duration-200`}
    >
      <div className="w-full h-20 flex items-center justify-center mb-2">
        <img src={image} alt={title} className="h-16 object-contain" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="mt-2 text-sm font-medium text-green-700">
        {productCount} Products
      </span>
    </div>
  );
};

export default CategoryCard;
