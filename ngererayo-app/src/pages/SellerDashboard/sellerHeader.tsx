import React, { useState, useEffect } from 'react';
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
  LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/images/LOGO.png';
import { api } from '../../utilis/api';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null); // ✅ store role

  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Marketplace', path: '/seller-marketplace', icon: <Store size={16} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={16} /> },
  ];

  // Fetch user profile if token exists
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      api
        .get('/accounts/current-user/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsername(res.data.username || res.data.email);
          setRole(res.data.role); // ✅ save role
        })
        .catch(() => {
          setUsername(null);
          setRole(null);
        });
    }
  }, []);

  const navigateToDashboard = () => {
    if (role === "farmer") {
      navigate("/seller-dashboard");
    } else if (role === "buyer") {
      navigate("/buyerhome");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUsername(null);
    setRole(null);
    navigate("/login", { replace: true });
  };

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
            <Link to="#" className="text-green-700 font-bold text-lg">
              NGERERAYO
            </Link>
            <p className="text-xs text-gray-500 -mt-1">
              Agricultural Marketplace
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {navLinks.map((item) =>
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
          )}
        </nav>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4 relative">
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

        

          <button className="text-black hover:text-green-600">
            <Bell size={20} />
          </button>

          {/* User Dropdown */}
          {username ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-black hover:text-green-600 cursor-pointer"
              >
                <User size={20} />
                <span className="text-sm">{username}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-700">{username}</p>

                  {/* ✅ Only show if farmer */}
                  {role === "farmer" && (
                    <button
                      onClick={() => {
                        navigateToDashboard();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Seller Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-black hover:text-green-600">
              <User size={20} />
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 py-3 space-y-4">
          <div className="space-y-3">
            {navLinks.map((item) =>
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
            )}
          </div>

          <div className="flex space-x-4 mt-4">
            <Search size={20} />
            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={20} />
            </Link>
            <Bell size={20} />
            {username ? (
              <>
                {/* ✅ Show seller dashboard only if farmer */}
                {role === "farmer" && (
                  <button
                    onClick={() => {
                      navigateToDashboard();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 flex items-center space-x-1 w-full"
                  >
                    <span>Seller Dashboard</span>
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="text-red-600 flex items-center space-x-1 w-full"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
