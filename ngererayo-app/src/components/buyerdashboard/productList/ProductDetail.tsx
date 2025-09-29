// pages/marketplace/ProductDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  discounted_price?: string;
  quantity: number;
  product_image: string;
  owner: number;
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isOwner = ownerId === product?.owner;

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/da16ppdly/";

  const getImageUrl = (image: string) => {
    if (!image) return "/placeholder.png"; 
    return image.startsWith("http") ? image : `${CLOUDINARY_BASE_URL}${image}`;
  };

  // Fetch current logged-in user
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    api.get("/accounts/current-user/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setOwnerId(res.data.owner?.id || null))
      .catch((err) => console.error("Error fetching current user:", err));
  }, []);

  // Fetch product with token for user-specific discounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await api.get(`/market/product/${productId}/`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`, // ✅ include token
          },
        });

        setProduct(response.data);
        console.log("Fetched product:", response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.product_name,
      price: Number(product.discounted_price || product.price),
      image: product.product_image,
      sellerId: product.owner?.toString() || "unknown",
      sellerName: "Unknown Farmer",
      unit: "piece",
    });
    toast.success(`${product.product_name} added to cart`);
  };

  const openChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
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
              <ArrowLeft size={20} /> Back to Marketplace
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
                src={getImageUrl(product.product_image)}
                alt={product.product_name}
                className="max-w-full max-h-[500px] object-contain rounded-xl"
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
                    src={getImageUrl(product.product_image)}
                    alt={product.product_name}
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
                {product.discounted_price ? (
                  <>
                    <span className="text-4xl font-bold text-green-600">
                      RWF {product.discounted_price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      RWF {product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-green-600">
                    RWF {product.price}
                  </span>
                )}
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
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <CheckCircle size={14} className="text-green-600" />
                    <span>Verified seller</span>
                    <span className="text-gray-400">•</span>
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
              {isOwner ? (
                <p className="text-xs text-gray-500 italic w-full text-center">
                  This is your product
                </p>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
                >
                  Add to Cart
                </button>
              )}
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
