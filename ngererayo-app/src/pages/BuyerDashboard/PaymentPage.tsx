import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Header from '../../components/landingpage/Header';
import Footer from '../../components/landingpage/Footer';
import PaymentMethodCard from '../../components/payment/PaymentMethodCard';
import OrderSummaryCard from '../../components/payment/OrderSummaryCard';
import MobileNumberInput, { validateRwandanPhone } from '../../components/payment/MobileNumberInput';
import { PaymentMethod, PaymentData } from '../../type/payment';

const paymentMethods: PaymentMethod[] = [
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    description: 'Airtel Money, MTN momo',
    icon: 'smartphone',
    enabled: true
  },
  {
    id: 'bank_transfer',
    name: 'Bank transfer',
    description: 'Direct bank transfer',
    icon: 'building-2',
    enabled: true
  },
  {
    id: 'cash_on_delivery',
    name: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: 'banknote',
    enabled: true
  }
];

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod['id']>('mobile_money');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = getCartTotal();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const isFormValid = () => {
    if (selectedPaymentMethod === 'mobile_money') {
      return validateRwandanPhone(mobileNumber);
    }
    return true;
  };

  const handlePayment = async () => {
    if (!isFormValid()) return;
    
    setIsProcessing(true);
    setErrors({});
    
    try {
      const paymentData: PaymentData = {
        method: selectedPaymentMethod,
        ...(selectedPaymentMethod === 'mobile_money' && { mobileNumber }),
      };
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearCart();
      navigate('/order-success');
    } catch (error) {
      setErrors({ payment: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-8">Payment</h1>
          
          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Choose payment method</h3>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    checked={selectedPaymentMethod === method.id}
                    onChange={() => setSelectedPaymentMethod(method.id)}
                    className="text-green-600"
                  />
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    {method.id === 'mobile_money' && '📱'}
                    {method.id === 'bank_transfer' && '🏦'}
                    {method.id === 'cash_on_delivery' && '💵'}
                  </div>
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Number Input */}
          {selectedPaymentMethod === 'mobile_money' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+250788894"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/cart')}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back to cart
            </button>
            
            <button
              onClick={handlePayment}
              disabled={!isFormValid() || isProcessing}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isProcessing ? 'Processing...' : `Pay $${total}`}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;