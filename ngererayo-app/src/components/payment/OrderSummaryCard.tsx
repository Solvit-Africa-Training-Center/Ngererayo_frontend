import React from 'react';
import { CartItem } from '../../type/cart';

interface OrderSummaryCardProps {
  items: CartItem[];
  total: number;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ items, total }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="text-gray-600">{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between text-xl font-semibold">
          <span>Total</span>
          <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;