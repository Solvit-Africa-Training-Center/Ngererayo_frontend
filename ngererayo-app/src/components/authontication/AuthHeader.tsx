import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Bell,
  Globe,
  Menu,
  X,
  Phone,
  LifeBuoy,
  Users,
  LayoutGrid,
  Store,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/LOGO.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const handleScroll = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-md fixed z-50 w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="leading-tight">
            <Link to="/" className="text-green-700 font-bold text-lg">
              NGERERAYO
            </Link>
            <p className="text-xs text-gray-500 -mt-1">Agricultural Marketplace</p>
          </div>
        </div>

        {/* Desktop Nav */}
        

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          
          <button className="text-sm text-black flex items-center space-x-1 hover:text-green-600">
            <Globe size={16} />
            <span>EN</span>
          </button>

          <button className="text-black hover:text-green-600">
            <ShoppingCart size={20} />
          </button>
          <button className="text-black hover:text-green-600">
            <Bell size={20} />
          </button>
          <button className="text-black hover:text-green-600">
            <User size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 py-3 space-y-4">
          

          <div className="flex space-x-4 mt-4">
            <Search size={20} />
            <ShoppingCart size={20} />
            <Bell size={20} />
            <User size={20} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
