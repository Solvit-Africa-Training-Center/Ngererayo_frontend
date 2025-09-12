import React from "react";
import { ShoppingBag, DollarSign, MessageSquare, Search, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/landingpage/Footer";
import Header from "../../components/landingpage/Header";

export default function HomeDashboard() {
  const navigate = useNavigate();
  
  return (

     <div>

     <Header />
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back Jean</h1>
        <p className="text-gray-500">Account verified</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center justify-between border border-gray-400 rounded-xl p-4 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Active Orders</p>
              <p className="text-xl font-semibold">8</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border border-gray-400 rounded-xl p-4 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <DollarSign className="text-green-500" />
            <div>
              <p className="text-sm text-gray-500">This month</p>
              <p className="text-xl font-semibold">$2309</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border border-gray-400 rounded-xl p-4 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-pink-500" />
            <div>
              <p className="text-sm text-gray-500">Unread Messages</p>
              <p className="text-xl font-semibold">5</p>
            </div>
          </div>
        </div>
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

        {/* Recent Orders */}
        <div className="border border-gray-300 rounded-xl bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent orders</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3 bg-yellow-50">
              <div>
                <p className="text-sm text-gray-500">Order #1002</p>
                <p className="font-medium">Maize</p>
              </div>
              <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-lg">
                Shipped
              </span>
            </div>
            <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3 bg-yellow-50">
              <div>
                <p className="text-sm text-gray-500">Order #1004</p>
                <p className="font-medium">Tomatoes</p>
              </div>
              <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-lg">
                Shipped
              </span>
            </div>
            <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3 bg-yellow-50">
              <div>
                <p className="text-sm text-gray-500">Order #1003</p>
                <p className="font-medium">Yams</p>
              </div>
              <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-lg">
                Shipped
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  <Footer />
    </div>
  );
}
