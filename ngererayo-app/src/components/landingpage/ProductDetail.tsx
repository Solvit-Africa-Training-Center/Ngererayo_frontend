import React from "react";
import { Star, MapPin, CheckCircle, MessageSquare } from "lucide-react";
import { Product } from "@/type/index";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="p-8 bg-amber-50 min-h-screen">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl"
          />
          <button className="mt-4 text-green-600 flex items-center hover:underline">
            ← Back to Marketplace
          </button>
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 mb-4">
            <MapPin size={16} /> {product.location}
          </div>

          <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Seller Info */}
          <div className="border rounded-lg p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="font-semibold">{product.seller.name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star size={14} className="text-yellow-400 fill-yellow-400" /> 
                {product.seller.rating} ({product.seller.reviews} reviews)
                <CheckCircle size={14} className="text-green-600" />
                Verified seller
              </div>
            </div>
            <button 
              onClick={() => navigate(`/messages/product/${product.id}/seller/${product.owner.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1"
            >
              <MessageSquare size={16} /> Contact
            </button>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <label className="font-medium">Quantity</label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="w-16 border rounded-lg px-2 py-1 text-center"
            />
          </div>
          <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviewsList.map((review, index) => (
            <div
              key={index}
              className="bg-amber-100 rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold">{review.user}</p>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
