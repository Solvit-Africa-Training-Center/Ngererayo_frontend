import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/consultantDashboard/SideBar";
import TopNavbar from "../components/consultantDashboard/TopNavbar";
import Footer from "./Footer";

const SellerLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-white-">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
         <Footer /> 
        </main>
        
      </div>
    </div>
  );
};

export default SellerLayout;
