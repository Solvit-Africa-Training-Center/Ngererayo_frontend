/**
 * SHOPPING CART PAGE - Cart management with order summary
 * 
 * Integration Notes:
 * - Requires CartContext provider in App.tsx
 * - Calculates subtotal, shipping (free >$50), tax (8%)
 * - Empty state shows highlighted calculation placeholders
 * - Routes to /payment on checkout
 * 
 * Dependencies: CartContext, CartItem type
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Header from '../../components/landingpage/Header';
import Footer from '../../components/landingpage/Footer';
import CartItem from './cart/CartItem';
import OrderSummary from './cart/OrderSummary';

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  // Access cart state and functions from CartContext
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Navigate to payment page when checkout is clicked
  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-8">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="text-center">
                  <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some products to get started</p>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:col-span-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded text-xs font-mono">$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded text-xs font-mono">$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded text-xs font-mono">$0.00</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-semibold">
                    <span className="text-gray-400">Total</span>
                    <span className="bg-yellow-200 px-3 py-2 rounded font-mono text-gray-600">$0.00</span>
                  </div>
                </div>
                
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed mb-4"
                >
                  Checkout
                </button>
                
                <p className="text-center text-gray-400 text-sm">
                  Add items to enable checkout
                </p>
              </div>
            ) : (
              <OrderSummary
                items={cartItems}
                onProceedToPayment={handleProceedToPayment}
              />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShoppingCart;