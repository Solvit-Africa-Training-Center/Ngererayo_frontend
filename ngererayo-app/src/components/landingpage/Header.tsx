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
import { useCart } from '../../context/CartContext';
import logo from '../../assets/images/LOGO.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  const navLinks = [
    { name: 'Marketplace', path: '/products', icon: <Store size={16} /> },
    { name: 'Categories', path: '#categories', icon: <LayoutGrid size={16} /> },
    { name: 'Community', path: '#community', icon: <Users size={16} /> },
    { name: 'Support', path: '/support', icon: <LifeBuoy size={16} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={16} /> },
  ];

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
        <nav className="hidden lg:flex space-x-6 items-center">
          {navLinks.map((item) => (
            item.path.startsWith('#') ? (
              <button
                key={item.name}
                onClick={() => handleScroll(item.path)}
                className="flex items-center cursor-pointer space-x-1 text-sm text-black hover:text-green-600"
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center cursor-pointer space-x-1 text-sm text-black hover:text-green-600"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          ))}
        </nav>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Products..."
              className="bg-gray-100 text-sm px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={16} />
          </div>

          <button className="text-sm text-black flex items-center space-x-1 hover:text-green-600">
            <Globe size={16} />
            <span>EN</span>
          </button>

          <Link to="/cart" className="text-black hover:text-green-600 relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
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
          <div className="space-y-3">
            {navLinks.map((item) => (
              item.path.startsWith('#') ? (
                <button
                  key={item.name}
                  onClick={() => {
                    handleScroll(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-black hover:text-green-600"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-black hover:text-green-600"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div className="flex space-x-4 mt-4">
            <Search size={20} />
            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={20} />
            </Link>
            <Bell size={20} />
            <User size={20} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
