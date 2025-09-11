import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { FARMERS } from '@/utilis/constraints';

const Farmers: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
   
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Verified Farmers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FARMERS.map(farmer => (
            <div key={farmer.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-green-100 relative">
                <img 
                  src={farmer.image} 
                  alt={farmer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-xl mb-2">{farmer.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span>{farmer.location}</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(farmer.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{farmer.rating.toFixed(1)}</span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Products:</h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.products.map((product, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
 
    </div>
  );
};

export default Farmers;