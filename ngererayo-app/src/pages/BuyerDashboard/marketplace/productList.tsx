import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../utilis/api"; // ✅ use your api util
import ProductCard from "../../../components/buyerdashboard/productList/productCard";

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ownerId, setOwnerId] = useState<number | null>(null);

  // ✅ Fetch logged-in user's ownerId
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    api
      .get("/accounts/current-user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOwnerId(res.data.owner?.id || null);
        console.log(res.data)
      })
      
      .catch((err) => {
        console.error("Error fetching current user:", err);
      });
  }, []);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const res = await axios.get(
        "https://ngererayo-backend.onrender.com/market/all-products/",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ pass token here
          },
        }
      );

      setProducts(res.data);
      setFilteredProducts(res.data);
      console.log("Fetched products:", res.data);
      setLoading(false);
      console.log("Fetched products with discounts:", res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  // ✅ Filter products based on search
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  return (
    <div>
      <div className="py-20 bg-white/70">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl text-green-700 font-bold">
                Featured Products
              </h2>
              <p>Choose from high-quality products from nearby trusted farmers</p>
            </div>

            {/* Search bar */}
            <div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                     id: product.id,
                     name: product.product_name,
                     price: `RWF ${product.discounted_price}`,
                     rating: 4,
                  
                     image: product.product_image,
                     farmer: product.owner?.farming_name || "Unknown Farmer",
                     description: product.description,
                   }}
                   
                  isOwner={ownerId === product.owner} // ✅ flag
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
    </div>
  );
};

export default ProductsSection;
