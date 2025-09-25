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
  const [productMap, setProductMap] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("No token found");

        // Fetch orders
        const orderRes = await fetch(
          "https://ngererayo-backend.onrender.com/market/get-orders/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!orderRes.ok) throw new Error("Failed to fetch orders");

        const orders: Order[] = await orderRes.json();
        if (orders.length === 0) {
          setLoading(false);
          return;
        }

        // Get latest order
        const sorted = [...orders].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        const latest = sorted[0];
        setLatestOrder(latest);

        // Fetch product names for order items
        const productIds = latest.items.map((item) => item.product);
        const productRequests = productIds.map((id) =>
          fetch(`https://ngererayo-backend.onrender.com/market/product/${id}/`, {
            headers: { accept: "application/json" },
          }).then((res) => res.json())
        );

        const productsData = await Promise.all(productRequests);
        const map: Record<number, string> = {};
        productsData.forEach((prod) => {
          map[prod.id] = prod.product_name;
        });
        setProductMap(map);
      } catch (error) {
        console.error("Error fetching orders or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="border rounded-2xl shadow-lg p-6 bg-white">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/5 mt-4"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="flex gap-5 mt-6">
                <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!latestOrder) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="text-center py-12">
          <div className="flex flex-col items-center justify-center">
            <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
            <p className="text-gray-500 max-w-md">
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
            <button
              onClick={() => navigate("/market")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Overview</h2>
          <p className="text-gray-600">Here's your latest order details</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg mt-4 sm:mt-0">
          <span className="text-sm font-medium text-blue-700">
            Latest Order • #{latestOrder.id}
          </span>
        </div>
      </div>

      {/* Order Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
        {/* Card Header */}
        <div className="bg-green-700 p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Order #{latestOrder.id}</h3>
                <p className="text-emerald-100">
                  Placed on {new Date(latestOrder.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {latestOrder.items.length} item{latestOrder.items.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold text-gray-700">Delivery Address</span>
              </div>
              <p className="text-gray-600 text-sm">{latestOrder.address}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-gray-700">Order Date & Time</span>
              </div>
              <p className="text-gray-600 text-sm">
                {new Date(latestOrder.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Order Items
            </h4>
            
            {latestOrder.items.length > 0 ? (
              <div className="space-y-3">
                {latestOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 block">
                          {productMap[item.product] || `Product #${item.product}`}
                        </span>
                        <span className="text-sm text-gray-500">Product ID: {item.product}</span>
                      </div>
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full border">
                      <span className="font-semibold text-gray-700">{item.quantity}</span>
                      <span className="text-gray-500 text-sm ml-1">qty</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                </svg>
                <p className="text-gray-500">No items in this order</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Order
            </button>
            <button
              onClick={() =>
                navigate("/buyer/payment", { state: { orderId: latestOrder.id } })
              }
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Need Help?</h4>
            <p className="text-blue-700 text-sm">
              If you have any questions about your order, please contact our customer support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;