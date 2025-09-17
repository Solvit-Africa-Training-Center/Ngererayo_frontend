import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../../type/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  // Calculate total price for this item (price × quantity)
  const itemTotal = item.price * item.quantity;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-400 p-6">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/80/80';
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)} per unit</p>
          <p className="text-sm text-gray-500 mt-1">In stock</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="w-12 text-center font-medium text-lg">{item.quantity}</span>
            
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="text-right min-w-0">
            <p className="font-semibold text-lg text-gray-900">${itemTotal.toFixed(2)}</p>
          </div>
          
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;