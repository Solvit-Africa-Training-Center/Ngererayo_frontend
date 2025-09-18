import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../DashboardHeader";
import Footer from "../../../components/landingpage/Footer";

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
  const [orders, setOrders] = useState<Order[]>([]);
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

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center py-10">You have no orders yet.</p>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Your Orders Overview</h2>

        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg shadow p-6 mb-6 bg-white"
          >
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Address:</span> {order.address}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>

            <h3 className="font-semibold mt-4 mb-2">Items:</h3>
            {order.items.length > 0 ? (
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>Product ID: {item.product}</span>
                    <span>Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No items in this order.</p>
            )}

            <button
              onClick={() => navigate("/payment")}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
            >
              Proceed to Payment
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default OrderOverview;
