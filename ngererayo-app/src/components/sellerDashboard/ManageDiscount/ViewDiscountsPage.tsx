import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../utilis/api";
import { toast } from "react-toastify";

interface Discount {
  id: number;
  product: number;
  customer: number;
  discount_type: string;
  amount: string;
  created_at: string;
  product_name?: string;
  customer_username?: string;
}

interface Product {
  id: number;
  product_name: string;
  description: string;
}

const ViewDiscountsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState<"percent" | "amount">("amount");

  const fetchProduct = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await api.get<Product>(`/market/products/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch product details.");
    }
  };

  const fetchDiscounts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await api.get<Discount[]>(
        `/market/products/${productId}/discounts/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // enrich each discount with product name & customer username
      const discountsWithNames = await Promise.all(
        res.data.map(async (d) => {
          let product_name = "";
          let customer_username = "";

          try {
            const productRes = await api.get(`/market/products/${d.product}/`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            product_name = productRes.data.product_name;
          } catch (e) {
            console.warn("Could not fetch product name", e);
          }

          try {
            const userRes = await api.get(`/accounts/user/${d.customer}/`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            customer_username = userRes.data.username;
          } catch (e) {
            console.warn("Could not fetch customer username", e);
          }

          return { ...d, product_name, customer_username };
        })
      );

      setDiscounts(discountsWithNames);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch discounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchDiscounts();
  }, [productId]);

  const handleDelete = async (customerId: number) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      try {
        const token = sessionStorage.getItem("token");
        await api.delete(
          `/market/products/${productId}/discounts/${customerId}/delete/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Discount deleted successfully!");
        fetchDiscounts();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete discount.");
      }
    }
  };

  const handleUpdate = async (customerId: number) => {
    if (!editAmount) {
      toast.warning("Please enter a discount amount");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      await api.put(
        `/market/owner-product/${productId}/discounts/${customerId}/edit/`,
        { amount: editAmount, discount_type: editType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Discount updated successfully!");
      setEditingDiscount(null);
      fetchDiscounts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update discount.");
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-green-800 to-indigo-700 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Product Discounts</h1>
            <p className="text-blue-100">
              Managing discounts for: <span className="font-semibold text-white">{product?.product_name || "Unknown Product"}</span>
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium cursor-pointer"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {discounts.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Discounts Found</h3>
              <p className="text-gray-500 max-w-md">
                No discounts have been created for this product yet. Start by adding discounts to attract more customers.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Active Discounts</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {discounts.length} discount{discounts.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Discounts Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {discounts.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50 transition-colors duration-150 group">
                      {editingDiscount?.id === d.id ? (
                        // Edit Mode
                        <>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-2 rounded-full mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <span className="font-medium text-gray-900">{d.customer_username || d.customer}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={editType}
                              onChange={(e) => setEditType(e.target.value as "percent" | "amount")}
                              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="percent">Percentage</option>
                              <option value="amount">Fixed Amount</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-32"
                              placeholder="Enter amount..."
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(d.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdate(d.customer)}
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-medium"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save
                              </button>
                              <button
                                onClick={() => setEditingDiscount(null)}
                                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // View Mode
                        <>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="bg-gray-100 p-2 rounded-full mr-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div>
                                <span className="font-medium text-gray-900 block">{d.customer_username || d.customer}</span>
                                <span className="text-sm text-gray-500">Customer ID: {d.customer}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-semibold text-green-600">
                              {d.product_name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              d.discount_type === 'percent' 
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {d.discount_type === 'percent' ? 'Percentage' : 'Fixed Amount'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-semibold text-green-600">
                              {d.amount}{d.discount_type === 'percent' ? '%' : ' RWF'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600">
                              {new Date(d.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                              <div className="text-xs text-gray-400">
                                {new Date(d.created_at).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingDiscount(d);
                                  setEditAmount(d.amount);
                                  setEditType(d.discount_type as "percent" | "amount");
                                }}
                                className="flex items-center px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium cursor-pointer"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(d.customer)}
                                className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium cursor-pointer" 
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewDiscountsPage;