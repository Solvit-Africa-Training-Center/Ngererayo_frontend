// components/sellerDashboard/OrderDetailsModal.tsx
import React from "react";

interface OrderItem {
  product: number;
  quantity: number;
  product_name?: string;
  product_price?: string;
  product_image?: string;
}

interface Order {
  id: number;
  user: number;
  user_name?: string;
  items: OrderItem[];
  address: string;
  created_at: string;
  status?: string;
}

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onStatusUpdate: (newStatus: string) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onStatusUpdate,
}) => {
  // Calculate total value of the order
  const total = order.items.reduce((sum, item) => {
    const price = item.product_price ? parseFloat(item.product_price) : 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="overlay-fallback">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
              <p className="text-lg font-semibold">#{order.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
              <p className="text-lg">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Customer</h3>
              <p className="text-lg">{order.user_name || "Unknown"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
              <p className="text-lg">{order.address}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center border-b pb-4">
                  {item.product_image && (
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product_name || `Product #${item.product}`}</h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      RWF {item.product_price ? (parseFloat(item.product_price) * item.quantity).toFixed(2) : "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      RWF {item.product_price || "N/A"} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Order Status</h3>
              <select
                value={order.status}
                onChange={(e) => onStatusUpdate(e.target.value)}
                className="mt-2 p-2 border rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-green-600">RWF {total.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;