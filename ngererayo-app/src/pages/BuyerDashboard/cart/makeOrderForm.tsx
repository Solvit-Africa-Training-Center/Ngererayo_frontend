import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { toast } from "react-hot-toast";

const OrderForm: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
  });
  const [errors, setErrors] = useState<{ address?: string }>({});
  const [loading, setLoading] = useState(false);

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/da16ppdly/";

const getImageUrl = (image: string) => {
  if (!image) return "/placeholder.png"; 
  return image.startsWith("http") ? image : `${CLOUDINARY_BASE_URL}${image}`;
};
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));

    // live validation
    if (name === "address") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, address: "Address is required" }));
      } else if (value.trim().length < 10) {
        setErrors((prev) => ({
          ...prev,
          address: "Address must be at least 10 characters",
        }));
      } else {
        setErrors((prev) => {
          const { address, ...rest } = prev;
          return rest; // remove address error
        });
      }
    }
  };

  const handleProceed = async () => {
    // final validation check before submit
    if (!shippingAddress.address.trim()) {
      setErrors({ address: "Address is required" });
      toast.error("Please enter your shipping address");
      return;
    }
    if (shippingAddress.address.trim().length < 10) {
      setErrors({ address: "Address must be at least 10 characters" });
      toast.error("Address too short, please provide more details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderData = {
      address: shippingAddress.address,
      items: cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        "https://ngererayo-backend.onrender.com/market/place-order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed:", data);

      clearCart();
      toast.success("Order saved successfully, redirecting...");

      setTimeout(() => {
        navigate("/buyer/order-overview");
      }, 1200);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("There was a problem placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4 md:px-8 max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Place Order</h1>
        <p className="text-gray-600 mb-8">
          Review your order and provide shipping information
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-l font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Order Summary
              </h2>

              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-500">Your cart is empty.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center py-5">
                      <div className="relative">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-green-600 font-semibold">
                          {item.price.toFixed(2)} RWF
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {(item.price * item.quantity).toFixed(2)} RWF
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Shipping Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-l font-semibold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    placeholder="Enter your complete shipping address"
                    value={shippingAddress.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:border-transparent transition ${
                      errors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-green-500"
                    }`}
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Total & Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6 border border-gray-100">
              <h2 className="text-l font-semibold text-gray-800 mb-6">
                Order Total
              </h2>

              {/* ... (Order total summary stays the same) */}

              <button
                onClick={handleProceed}
                disabled={
                  loading || cartItems.length === 0 || !!errors.address
                }
                className="w-full bg-gradient-to-r from-green-500 to-green-600 cursor-pointer text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition shadow-md flex items-center justify-center"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By completing your purchase, you agree to our Terms of Service
                and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
