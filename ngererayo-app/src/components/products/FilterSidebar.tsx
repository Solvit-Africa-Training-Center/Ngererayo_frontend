import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, MapPin, DollarSign } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  filters: {
    category: string;
    priceRange: number[];
    location: string;
    rating: number;
  };
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories, filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    location: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? '' : category
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      priceRange: [min, max]
    });
  };

  const handleLocationChange = (location: string) => {
    onFilterChange({
      ...filters,
      location
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      priceRange: [0, 100000],
      location: '',
      rating: 0,
    });
  };

  const locations = ['Kigali', 'Huye', 'Musanze', 'Rubavu', 'Nyagatare', 'Karongi'];
  const priceRanges = [
    { label: 'Under RWF 1,000', min: 0, max: 1000 },
    { label: 'RWF 1,000 - 5,000', min: 1000, max: 5000 },
    { label: 'RWF 5,000 - 10,000', min: 5000, max: 10000 },
    { label: 'RWF 10,000 - 25,000', min: 10000, max: 25000 },
    { label: 'Above RWF 25,000', min: 25000, max: 100000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Categories */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900">Categories</h4>
            {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.category && (
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <DollarSign size={16} />
              Price Range
            </h4>
            {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.price && (
            <div className="mt-3 space-y-2">
              {priceRanges.map((range, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange[0] === range.min && filters.priceRange[1] === range.max}
                    onChange={() => handlePriceChange(range.min, range.max)}
                    className="border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <button
            onClick={() => toggleSection('location')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <MapPin size={16} />
              Location
            </h4>
            {expandedSections.location ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.location && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="mt-2 space-y-1">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationChange(location)}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div>
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Star size={16} />
              Rating
            </h4>
            {expandedSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.rating && (
            <div className="mt-3 space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div className="ml-2 flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-700">& up</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;