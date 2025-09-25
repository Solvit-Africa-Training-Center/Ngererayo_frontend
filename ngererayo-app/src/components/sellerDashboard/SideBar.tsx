import React from "react";
import { NavLink,Link } from "react-router-dom";
import { LayoutGrid, ShoppingCart,MessageSquare,Percent, Package } from "lucide-react";
import logo from '../../assets/images/LOGO.png';


const Sidebar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg ${
      isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white shadow-2xl h-screen p-4 space-y-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="leading-tight">
            <Link to="#" className="text-green-700 font-bold text-lg">
              NGERERAYO
            </Link>
            <p className="text-xs text-gray-500 -mt-1">
              Agricultural Marketplace
            </p>
          </div>
        </div>

      
      <nav className="flex flex-col space-y-2">
      <NavLink to="overview" className={linkClass}>
      <LayoutGrid size={20} />
        <span>Overview</span>
      </NavLink>
      <NavLink to="productslist" className={linkClass}>
        <Package size={20} />
        <span>Products</span>
      </NavLink>
      <NavLink to="orders" className={linkClass}>
        <ShoppingCart size={20} />
        <span>Orders</span>
      </NavLink>
       <NavLink to="messaging" className={linkClass}>
        <MessageSquare size={20} />
        <span>Messaging</span>
      </NavLink>
      <NavLink to="discount" className={linkClass}>
        <Percent size={20} />
        <span>Manage Discout</span>
      </NavLink>
      
      </nav>
    </aside>
  );
};

export default Sidebar;
