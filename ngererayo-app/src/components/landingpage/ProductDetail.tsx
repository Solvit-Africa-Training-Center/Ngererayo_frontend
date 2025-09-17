import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, MapPin, CheckCircle, MessageSquare } from "lucide-react";
import Header from "../authontication/AuthHeader";
import Footer from "./Footer";
import { api } from "../../utilis/api";

interface Product {
  id: number;
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `/market/product/${productId}/`,
          {
            headers: {
              "accept": "application/json",
              "X-CSRFTOKEN": "UOQm7Iw39fm1t2JsibDFFDaqNRpkUUAAqGx9bCrf5WPyyOXHg3ZVhb8Xcrvmc7R4",
            },
          }
        );
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center mt-12">Loading product...</p>;
  if (!product) return <p className="text-center mt-12">Product not found</p>;

  return (
    <div>
      <Header />
    
    <div className="py-25 bg-amber-50 min-h-screen">

      
      <button
        onClick={() => navigate(-1)}
        className="text-green-600 mb-4 ml-10 flex items-center hover:underline"
      >
        ← Back to Marketplace
      </button>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <img
            src={`https://ngererayo-backend.onrender.com${product.product_image}`}
            alt={product.product_name}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.product_name}</h1>
          <p className="text-2xl font-bold text-green-600 mb-4">
            RWF {product.price}
          </p>
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="border rounded-lg p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="font-semibold">{product.owner.farming_name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-green-600" />
                Verified seller
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1">
              <MessageSquare size={16} /> Contact
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ProductDetailPage;
