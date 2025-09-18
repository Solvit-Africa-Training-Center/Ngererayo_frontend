import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import Header from '../DashboardHeader';
import Footer from '../../../components/landingpage/Footer';

const OrderForm: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleProceed = async () => {
    if (!shippingAddress.address) {
      alert("Please fill in all required fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Prepare order payload in API format
    const orderData = {
      address: shippingAddress.address,
      items: cartItems.map(item => ({
        product: item.id,   // assuming backend expects product id
        quantity: item.quantity,
      })),
    };

    try {
      setLoading(true);

      // Get token from localStorage (or however you store it)
      const token = sessionStorage.getItem("token");

      const response = await fetch("https://ngererayo-backend.onrender.com/market/place-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed:", data);

      // Optionally clear cart after successful order
      clearCart();
    alert('order saved successfull, proceed to payement')
      // Redirect to payment page
       navigate("/order-oveview");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was a problem placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 p-6">
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6 space-y-6">
          {/* Cart Items */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your order product</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="divide-y">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shipping Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <input
                name="address"
                placeholder="Street Address"
                value={shippingAddress.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <button
            onClick={handleProceed}
            disabled={loading}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderForm;
