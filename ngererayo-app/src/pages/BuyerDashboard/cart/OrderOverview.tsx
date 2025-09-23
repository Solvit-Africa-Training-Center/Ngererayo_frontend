import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  product: number;
  quantity: number;
}

interface Order {
  id: number;
  address: string;
  created_at: string;
  items: OrderItem[];
}

const OrderOverview: React.FC = () => {
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch(
          `https://ngererayo-backend.onrender.com/market/get-orders/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data: Order[] = await response.json();

        if (data.length > 0) {
          const sorted = [...data].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          setLatestOrder(sorted[0]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading your latest order...</p>;
  }

  if (!latestOrder) {
    return <p className="text-center py-10">You have no orders yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Order Overview</h2>

      <div className="border rounded-lg shadow p-6 mb-6 bg-white">
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Order ID:</span> {latestOrder.id}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Address:</span> {latestOrder.address}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(latestOrder.created_at).toLocaleString()}
        </p>

        <h3 className="font-semibold mt-4 mb-2">Items:</h3>
        {latestOrder.items.length > 0 ? (
          <ul className="space-y-2">
            {latestOrder.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>Product ID: {item.product}</span>
                <span>Qty: {item.quantity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items in this order.</p>
        )}

        <div className="flex gap-5">
          <button
            className="mt-4 w-full bg-gray-300 text-white py-2 cursor-pointer rounded-lg font-medium hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              navigate("/buyer/payment", { state: { orderId: latestOrder.id } })
            }
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
