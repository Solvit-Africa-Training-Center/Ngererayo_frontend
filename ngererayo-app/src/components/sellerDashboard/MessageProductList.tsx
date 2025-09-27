import React from "react";
import { useCurrentUser } from "../../Hooks/SellerDashboard/useCurrentUser";
import { useOwnerProducts } from "../../Hooks/SellerDashboard/useOwnerProducts";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const { currentUser, loading: userLoading } = useCurrentUser(token);
  const { products, loading: productsLoading } = useOwnerProducts(currentUser?.owner_id || null, token);
 
 
  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/da16ppdly/";

const getImageUrl = (image: string) => {
  if (!image) return "/placeholder.png"; 
  return image.startsWith("http") ? image : `${CLOUDINARY_BASE_URL}${image}`;
};
  if (userLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
  
  if (productsLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600 mt-2">Select a product to view messages</p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                   src={getImageUrl(product.product_image)}
                   alt={product.product_image}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                {/* Product Name */}
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.product_name}</h3>

                {/* Button to view messages */}
                <button
                  onClick={() => navigate(`/seller-dashboard/messaging/${product.id}`)}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  View Messages
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;