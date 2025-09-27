import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { Product } from '../../../types/index';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  isOwner?: boolean; // ✅ add this
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isOwner }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

    const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/da16ppdly/";

const getImageUrl = (image: string) => {
  if (!image) return "/placeholder.png"; 
  return image.startsWith("http") ? image : `${CLOUDINARY_BASE_URL}${image}`;
};

  const handleClick = () => {
    navigate(`/buyer/product/${product.id}`);
  };

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
    toast.success(`${product.name} added to cart`);
  };

  const openChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/buyer/product/${product.id}/chat`, { state: { product } });
  };

  return (
    <div className="bg-white rounded-xl cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition">
      <div onClick={handleClick}>
        <div className="h-48 bg-white relative">
 <img
  src={getImageUrl(product.image)}
  alt={product.name}
  className="w-full h-full object-cover"
/>



          
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
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
     
        </div>
      </div>

      <div className='flex gap-4 p-5 justify-between items-center'>
        {isOwner ? (
          <p className="text-xs text-gray-500 italic w-full text-center">
            This is your product
          </p>
        ) : (
          <>
            <button 
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
            >
              Add to Cart
            </button>

            <button
              onClick={openChat}
              className="border border-gray-500 p-2 rounded-xl cursor-pointer"
              aria-label={`Message seller about ${product.name}`}
            >
              <MessageCircle className="text-gray-500" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
