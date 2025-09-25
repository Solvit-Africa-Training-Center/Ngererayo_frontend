// pages/marketplace/ProductDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { CheckCircle, MessageSquare, Star, Shield, Truck, ArrowLeft, Heart, Share2 } from "lucide-react";
import { api } from "../../../utilis/api";
import ProductComments from "./ProductComments";
import { useCart } from '../../../context/CartContext';
import { toast } from "react-toastify";

interface Product {
  id: string;
  product_name: string;
  description: string;
  price: string;
  quantity: number;
  product_image: string;
  owner: {
    id: number;
    farming_name: string;
    location: string;
  };
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/market/product/${productId}/`, {
          headers: {
            accept: "application/json",
          },
        });
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);


const handleAddToCart = () => {
  if (!product) return; // guard

  addToCart({
    id: product.id,
    name: product.product_name,
    price: Number(product.price), // ✅ safe numeric conversion
    image: product.product_image,
    sellerId: product.owner?.id?.toString() || "unknown", // ✅ safe fallback
    sellerName: product.owner?.farming_name || "Unknown Farmer",
    unit: "piece",
  });
   toast.success(`${product.product_name} added to cart`);
};




const openChat = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!product) return; // guard
  navigate(`/buyer/product/${product.id}/chat`, { state: { product } });
};

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
        <button 
          onClick={() => navigate('/marketplace')}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Return to Marketplace
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Marketplace
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <img
                src={`https://ngererayo-backend.onrender.com${product.product_image}`}
                alt={product.product_name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={`https://ngererayo-backend.onrender.com${product.product_image}`}
                    alt={`${product.product_name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.product_name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(42 reviews)</span>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  In Stock ({product.quantity} available)
                </span>
              </div>
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-green-600">RWF {product.price}</span>
                <span className="text-lg text-gray-500 line-through">RWF {Number(product.price) * 1.2}</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                  20% OFF
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck size={16} className="text-green-500" />
                Free delivery
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} className="text-green-500" />
                1-year warranty
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{product.owner.farming_name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <CheckCircle size={14} className="text-green-600" />
                    <span>Verified seller</span>
                    <span className="text-gray-400">•</span>
                    <span>{product.owner.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-gray-500">(128 reviews)</span>
                  </div>
                </div>

               <button 
               onClick={openChat}
               className="bg-green-600 text-white px-6 py-3 rounded-xl cursor-pointer flex items-center gap-2 hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
               aria-label={`Message seller about ${product.product_name}`}
             >
               <MessageSquare size={18} /> Contact Seller
             </button>
             
                
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 cursor-pointer
               text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">
                Add to Cart
              </button>
           
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <ProductComments productId={product.id.toString()} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;