import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, DollarSign, MessageSquare, Search, ShoppingCart } from "lucide-react";
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

interface Props {
  orders: Order[];
  loading: boolean;
}

const RecentOrders: React.FC<Props> = ({ orders, loading }) => {
      const navigate = useNavigate();

  if (loading) return <p className="text-center py-10 text-gray-600">Loading recent orders...</p>;
  if (orders.length === 0) return <p className="text-center py-10 text-gray-600">No recent orders.</p>;

  const totalOrders = orders.length;
  const recentOrders = orders.slice(-3).reverse(); // last 3 orders

  return (
    <div className="space-y-6">
      {/* Total Orders Card */}
      <div className="bg-white p-6 rounded-xl border border-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Total Orders</h2>
        <p className="text-lg text-gray-700">
            <ShoppingBag className="text-blue-500" />
          <span className="font-semibold text-green-600">{totalOrders}</span> orders placed
        </p>
      </div>
       {/* Quick Actions + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="border border-gray-300 rounded-xl bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
          <div className="space-y-3">
            <button className="flex items-center gap-3 w-full border border-gray-300 rounded-lg p-3 hover:bg-gray-50">
              <Search className="text-green-500" />
              <span>Find seeds and organic food</span>
            </button>
            <button 
              onClick={() => navigate('/cart')}
              className="flex items-center gap-3 w-full border border-gray-300 rounded-lg p-3 hover:bg-gray-50"
            >
              <ShoppingCart className="text-blue-500" />
              <span>View Cart</span>
            </button>
            <button className="flex items-center gap-3 w-full border border-gray-300 rounded-lg p-3 hover:bg-gray-50">
              <MessageSquare className="text-purple-500" />
              <div>
              <label htmlFor="">Messages</label><br />
              <span>Chat with sellers</span>
              </div>
               
            </button>
          </div>
        </div>

      {/* Recent Orders List */}
      <div className="border border-gray-300 rounded-xl bg-white shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {recentOrders.map(order => (
            <div
              key={order.id}
              className="flex justify-between items-center border border-gray-300 rounded-lg p-3 bg-yellow-50"
            >
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                {order.items[0] && <p className="font-medium">{`Product ${order.items[0].product}`}</p>}
                <p className="text-sm text-gray-500">{order.address}</p>
                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-lg">
                Shipped
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RecentOrders;
