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
  const [discountType, setDiscountType] = useState<"amount" | "percentage">("amount");
  const [value, setValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

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

  try {
    const token = sessionStorage.getItem("token");
    await api.post(
      `/market/products/${product.id}/assign-discount/`,
      {
        customer_id: selectedUser,
        discount_type: discountType === "percentage" ? "percent" : "amount",
        amount: value,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  
    onSuccess();
  } catch (err) {
    console.error(err);
    toast.error("Failed to apply discount. Please check the input values.");
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Add Discount: {product.product_name}</h3>

        <select
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>

        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as any)}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="amount">Amount</option>
          <option value="percentage">Percentage</option>
        </select>

        <input
          type="number"
          placeholder="Discount value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
