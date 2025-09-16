import React from 'react';
import { Star, MapPin, MessageCircle, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/index';
import { useNavigate } from 'react-router-dom';

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="flex gap-4 p-4">
        <div className="w-32 h-32 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  {product.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span>By {product.farmer}</span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {product.location}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3 ml-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-700">
                  {product.price}
                </div>
                <div className="text-sm text-gray-500">
                  per unit
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart size={16} className="text-gray-600" />
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle size={16} className="text-gray-600" />
                </button>
                
                <button 
                  onClick={handleAddToCart}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;