import React, { useEffect, useState } from "react";
import { api } from "../../utilis/api";
import { toast } from "react-hot-toast";

interface Product {
  id: number;
  product_name: string;
}

interface OrderItem {
  product: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  address: string;
  created_at: string;
}

interface User {
  id: number;
  username: string;
  owner?: {
    id: number;
  };
}

const SellerOverview: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("No token found");

        // Fetch current user
        const userRes = await api.get<User>("/accounts/current-user/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(userRes.data);
        
        const ownerId = userRes.data.owner?.id;
        if (!ownerId) {
          toast.error("User is not an owner");
          setLoading(false);
          return;
        }

        // Fetch products and orders in parallel
        const [productsRes, ordersRes] = await Promise.all([
          api.get<Product[]>(`/market/owner/${ownerId}/products/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get<Order[]>("/market/get-orders/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProducts(productsRes.data);

        // Filter orders containing seller's products
        const sellerProductIds = new Set(productsRes.data.map((p) => p.id));
        const filteredOrders = ordersRes.data.filter((order) =>
          order.items.some((item) => sellerProductIds.has(item.product))
        );

        setOrders(filteredOrders);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold mb-6 text-gray-600">
        Welcome back, {currentUser?.username || "Seller"}!
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
          <div className="text-4xl font-bold text-blue-500">{products.length}</div>
          <div className="mt-2 text-gray-600 font-medium">Total Products</div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
          <div className="text-4xl font-bold text-green-500">{orders.length}</div>
          <div className="mt-2 text-gray-600 font-medium">Total Orders</div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
          <div className="text-4xl font-bold text-yellow-500">
            {orders.slice(0, 5).length}
          </div>
          <div className="mt-2 text-gray-600 font-medium">Recent Orders</div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No recent orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Products</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Address</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) =>
                  order.items.map((item, idx) => (
                    <tr
                      key={`${order.id}-${idx}`}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2 font-semibold text-gray-700">
                        #{order.id}
                      </td>
                      <td className="px-4 py-2">{item.product}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{order.address}</td>
                      <td className="px-4 py-2">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOverview;