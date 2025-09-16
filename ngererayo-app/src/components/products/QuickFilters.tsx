import React from 'react';
import { Leaf, Apple, Wheat, Carrot } from 'lucide-react';

interface QuickFiltersProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const QuickFilters: React.FC<QuickFiltersProps> = ({ onCategorySelect, selectedCategory }) => {
  const quickCategories = [
    { name: 'All', icon: <Leaf size={20} />, color: 'bg-gray-100 text-gray-700' },
    { name: 'Vegetables', icon: <Carrot size={20} />, color: 'bg-green-100 text-green-700' },
    { name: 'Fruits', icon: <Apple size={20} />, color: 'bg-red-100 text-red-700' },
    { name: 'Cereals', icon: <Wheat size={20} />, color: 'bg-yellow-100 text-yellow-700' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Filters</h3>
      <div className="flex flex-wrap gap-2">
        {quickCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name === 'All' ? '' : category.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              (category.name === 'All' && !selectedCategory) || selectedCategory === category.name
                ? 'bg-green-600 text-white'
                : `${category.color} hover:opacity-80`
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickFilters;