import React from 'react';
import { CartItem } from '../../../type/cart';

interface OrderSummaryProps {
  items: CartItem[];
  onProceedToPayment: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, onProceedToPayment }) => {
  // Calculate order totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-gray-600">
            <span className="truncate mr-2">{item.name} × {item.quantity}</span>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={onProceedToPayment}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mb-4"
      >
        Checkout
      </button>
      
      <p className="text-center text-gray-500 text-xs">
        🔒 Secure checkout with SSL encryption
      </p>
    </div>
  );
};

export default OrderSummary;