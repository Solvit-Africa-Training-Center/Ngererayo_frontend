import React, { useEffect, useState } from "react";
import { api } from "../../utilis/api";
import { toast } from "react-hot-toast";
import OrderDetailsModal from "./OrderDetailsModal";

interface OrderItem {
  product: number;
  quantity: number;
  product_name?: string;
  product_price?: string;
  product_image?: string;
}

interface Order {
  id: number;
  user: number; // keep user ID
  user_name?: string; // store fetched username
  items: OrderItem[];
  address: string;
  created_at: string;
  status?: string;
}

const SellerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view orders");
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch seller orders
        const res = await api.get<Order[]>("/market/owner/orders/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched orders:", res.data);

        // 2. Enhance orders with user and product details
        const enhancedOrders = await Promise.all(
          res.data.map(async (order) => {
            console.log("Processing order:", order.id, "user ID:", order.user);

            // Fetch user info
            let userName = "Unknown Customer";
            try {
              const userRes = await api.get(`/accounts/user/${order.user}/`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              console.log(`Fetched user info for order ${order.id}:`, userRes.data);
              userName = `${userRes.data.first_name} ${userRes.data.last_name}` || userRes.data.username;
            } catch (err) {
              console.error("Failed fetching user info for order", order.id, err);
            }

            // Fetch product details
            const enhancedItems = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const productRes = await api.get(`/market/products/${item.product}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  return {
                    ...item,
                    product_name: productRes.data.product_name,
                    product_price: productRes.data.price,
                    product_image: productRes.data.product_image,
                  };
                } catch (err) {
                  console.error("Failed fetching product info", err);
                  return item;
                }
              })
            );

            return { ...order, user_name: userName, items: enhancedItems };
          })
        );

        console.log("Enhanced orders:", enhancedOrders);
        setOrders(enhancedOrders);
      } catch (error) {
        console.error("Error fetching seller orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, []);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    const token = sessionStorage.getItem("token");
    try {
      await api.patch(
        `/market/orders/${orderId}/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Management</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No orders found for your products.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.user_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.items.map(item => item.product_name).join(", ")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-sm border rounded p-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showOrderModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowOrderModal(false)}
          onStatusUpdate={(newStatus) => updateOrderStatus(selectedOrder.id, newStatus)}
        />
      )}
    </div>
  );
};

export default SellerOrders;
