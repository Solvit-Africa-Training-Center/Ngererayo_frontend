// src/Layouts/BuyerDashboardLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/BuyerDashboard/DashboardHeader";
import Footer from "../components/landingpage/Footer";

const BuyerDashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Buyer Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 bg-gray-50 pt-16"> 
        {/* pt-16 ensures space for fixed header */}
        <Outlet />
      </main>

      {/* Buyer Footer */}
      <Footer />
    </div>
  );
};

export default BuyerDashboardLayout;
