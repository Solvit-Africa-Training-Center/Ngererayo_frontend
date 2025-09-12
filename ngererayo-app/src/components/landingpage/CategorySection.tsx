// components/CategorySection.tsx
import React from 'react';
import CategoryCard from './CategoryCard';

const CategorySection: React.FC = () => {
  const categories = [
    {
      title: 'Cereals',
      description: 'rice, maize, wheat',
      productCount: 12,
      image: '/categoryImages/Cereals.avif',
      bgClass: 'bg-yellow-100',
    },
    {
      title: 'Vegetables',
      description: 'Fresh leafy greens',
      productCount: 21,
      image: '/categoryImages/Vegetables.jpeg',
      bgClass: 'bg-blue-100',
    },
    {
      title: 'Fruits',
      description: 'Bananas, Avocados',
      productCount: 11,
      image: '/categoryImages/fruits.jpeg',
      bgClass: 'bg-orange-100',
    },
    {
      title: 'Livestock',
      description: 'Cattle, Poultry',
      productCount: 29,
      image: '/categoryImages/Livestock.jpeg',
      bgClass: 'bg-purple-100',
    },
    {
      title: 'Seeds',
      description: 'Planting materials',
      productCount: 22,
      image: '/categoryImages/seeds.jpeg',
      bgClass: 'bg-sky-100',
    },
    {
      title: 'Root & Tuber',
      description: 'Sweet Potatoes, Cassava, yams',
      productCount: 32,
      image: '/categoryImages/root-tuber.jpeg',
      bgClass: 'bg-pink-100',
    },
    {
      title: 'Services',
      description: 'Agricultural services',
      productCount: 6,
      image: '/categoryImages/Services.jpeg',
      bgClass: 'bg-lime-100',
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-2">
        Choose your category
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Browse products from different agricultural categories and find what you need
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.title}
            title={cat.title}
            description={cat.description}
            productCount={cat.productCount}
            image={cat.image}
            bgClass={cat.bgClass}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm font-medium">
          View all categories →
        </button>
      </div>
    </section>
  );
};

export default CategorySection;
