// src/components/landingpage/ProductsSection.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/landingpage/productCard";

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ngererayo-backend.onrender.com/market/all-products/")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 bg-white/70">
      <div className="container mx-auto px-4">
        <div className="text-center justify-between items-center mb-8">
          <h2 className="text-3xl text-green-700 font-bold">Featured Products</h2>
          <p>Choose from high-quality products from nearby trusted farmers</p>
          <button className="text-green-700 font-medium flex items-center">
            View all
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.product_name,
                  category: product.owner?.farming_name || "Unknown",
                  price: `RWF ${product.price}`,
                  rating: 4, // Default rating since API doesn't send one
                  image: `https://ngererayo-backend.onrender.com${product.product_image}`,
                  farmer: product.owner?.farming_name || "Unknown Farmer",
                  description: product.description,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full text-center py-10">
    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm font-medium">
          View all product
        </button>
      </div>
    
    </div>
  );
};

export default ProductsSection;
