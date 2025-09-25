// DiscountModal.tsx - Enhanced styling
import React, { useEffect, useState } from "react";
import { api } from "../../../utilis/api";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

const DiscountModal: React.FC<Props> = ({ product, onClose, onSuccess }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [discountType, setDiscountType] = useState<"Fixed" | "percentage">("Fixed");
  const [value, setValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await api.get(`/market/messages/${product.id}/all-users/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, [product.id]);

  const handleSubmit = async () => {
    if (!selectedUser) {
      toast.warning("Please select a user to assign the discount.");
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      await api.post(
        `/market/products/${product.id}/assign-discount/`,
        {
          customer_id: selectedUser,
          discount_type: discountType === "percentage" ? "percent" : "Fixed",
          amount: value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Discount applied successfully!");
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply discount. Please check the input values.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-800 to-indigo-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Add Discount</h3>
              <p className="text-blue-100 mt-1">{product.product_name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Customer
            </label>
            <select
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Choose a customer...</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Type
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as any)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="Fixed">Fixed Amount</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Value
            </label>
            <input
              type="number"
              placeholder={discountType === "percentage" ? "Enter percentage..." : "Enter amount..."}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Applying...
              </div>
            ) : (
              "Apply Discount"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;