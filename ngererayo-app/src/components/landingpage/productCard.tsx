import React from 'react';
import { Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '@/type/index';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('RWF ', '').replace(',', '')),
      image: product.image,
      sellerId: 'farmer1',
      sellerName: product.farmer,
      unit: 'piece'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-green-100 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-green-800">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">By {product.farmer}</p>
        <div className="flex items-center justify-between">
          <span className="text-green-700 font-bold">{product.price}</span>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
        </div>
        <button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;