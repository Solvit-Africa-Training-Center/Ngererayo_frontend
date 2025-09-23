import React, { useEffect, useState } from "react";
import { api } from "../../../utilis/api";
import ProfileInfo from "./profileinfo";
import OrdersInfo from "./ordersInfor";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
}

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

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "others">("orders");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const response = await api.get("/accounts/current-user/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab !== "orders") return;
      setLoadingOrders(true);
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`https://ngererayo-backend.onrender.com/market/get-orders/`, {
          headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
        });
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
    

      <div className="container mx-auto py-20 px-4 md:px-8">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 py-5">
         Welcome back, { user?.username}!
       </h2>
       
        {/* Navigation Tabs */}
        <div className="flex space-x-2 bg-white p-1 rounded-full shadow-sm border border-gray-200 mb-8">
         
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-1 px-5 rounded-full cursor-pointer font-medium transition-colors ${activeTab === "orders" 
              ? "bg-green-600 text-white shadow" 
              : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
          >
            Orders
          </button>
           <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-1 px-6 rounded-full cursor-pointer font-medium transition-colors ${activeTab === "profile" 
              ? "bg-green-600 text-white shadow" 
              : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab("others")}
            className={`flex-1 py-1 px-6 rounded-full cursor-pointer font-medium transition-colors ${activeTab === "others" 
              ? "bg-green-600 text-white shadow" 
              : "text-gray-600 hover:text-green-700 hover:bg-green-50"}`}
          >
            Others
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "profile" && <ProfileInfo user={user} loading={loadingUser} />}
          {activeTab === "orders" && <OrdersInfo orders={orders} loading={loadingOrders} />}
        </div>
      </div>

   
    </div>
  );
};

export default Profile;