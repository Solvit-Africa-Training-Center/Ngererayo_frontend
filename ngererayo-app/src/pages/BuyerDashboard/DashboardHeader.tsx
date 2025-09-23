import React, { useState, useEffect, useRef } from 'react';
import {
  Search,ShoppingCart,User,Bell,Globe,Menu,X,Phone,Briefcase ,LayoutGrid,Store,LogOut,Users,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/images/LOGO.png';
import { api } from '../../utilis/api';

interface UserRole {
  id: number;
  name: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/buyer/home", icon: <Store size={16} /> },
    { name: "Marketplace", path: "/buyer/marketplace", icon: <Store size={16} /> },
    { name: "Categories", path: "#categories", icon: <LayoutGrid size={16} /> },
    { name: "Consultant", path: "/buyer/consultant", icon: <Users size={16} /> },
    { name: "Contact", path: "/buyer/contact", icon: <Phone size={16} /> },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      api
        .get("/accounts/current-user/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsername(res.data.username || res.data.first_name || res.data.email);
          setEmail(res.data.email);
          setRole(res.data.role || []); // role is an array of {id, name}
        })
        .catch(() => {
          setUsername(null);
          setEmail(null);
          setRole([]);
        });
    }
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateToDashboard = () => {
    if (role.some(r => r.name === "farmer")) navigate("/seller-dashboard");
    else if (role.some(r => r.name === "buyer")) navigate("/buyer");
    else navigate("/");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUsername(null);
    setRole([]);
    navigate("/login", { replace: true });
  };

  const handleScroll = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-md fixed z-50 w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="leading-tight">
            <Link to="/buyer/home" className="text-green-700 font-bold text-lg">
              NGERERAYO
            </Link>
            <p className="text-xs text-gray-500 -mt-1">Agricultural Marketplace</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {navLinks.map((item) =>
            item.path.startsWith('#') ? (
              <button
                key={item.name}
                onClick={() => handleScroll(item.path)}
                className="flex items-center cursor-pointer space-x-1 text-sm text-gray-800 hover:text-green-600"
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center cursor-pointer space-x-1 text-sm text-gray-800 hover:text-green-600"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          )}
        </nav>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4 relative">
          <button className="text-sm text-black flex items-center space-x-1 hover:text-green-600">
            <Globe size={16} />
            <span>EN</span>
          </button>

          <Link to="/buyer/cart" className="text-black hover:text-green-600 relative">
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

          {/* User Dropdown */}
          {username ? (
            <div className="relative" ref={dropdownRef}>
              <div className='flex bg-gray-100 p-1 rounded-2xl cursor-pointer hover:text-green-500' 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
               <button
                
                className="flex items-center space-x-1 text-black"
              >
                <User size={20} />
              </button>
              <span>{username}</span>
              </div>
            

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-70 bg-white border border-gray-300 rounded-xl shadow-lg py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-400 text-center">
                    <User className="mx-auto text-green-600" size={32} />
                    <p className="font-medium text-gray-800">{username}</p>
                    <p className="text-sm text-gray-500">{email}</p>
                  </div>

                  {/* Profile */}
                  <button
                    onClick={() => {
                      navigate("/buyer/user-profile");
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <User size={20} className="mr-2" /> Profile
                  </button>

                  {/* Seller Dashboard button for farmers */}
                  {role.some(r => r.name === "farmer") && (
                    <button
                      onClick={() => {
                        navigateToDashboard();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                     <Store size={20} className="mr-2"  /> Seller Dashboard
                    </button>
                  )}

                  {/* Consultant Dashboard button */}
                  {role.some(r => r.name === "consultant") && (
                    <button
                      onClick={() => {
                        navigate("/consultant-board");
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                    <Briefcase size={20} className="mr-2"  />  Consultant Dashboard
                    </button>
                  )}

                  {/* Become a Seller button for non-farmers */}
                  {!role.some(r => r.name === "farmer") && (
                    <button
                      onClick={() => {
                        navigate("/buyer/become-seller");
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Become a Seller
                    </button>
                  )}

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
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

      {/* ✅ Logout Modal */}
      {showLogoutModal && (
        <div className="overlay-fallback fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
