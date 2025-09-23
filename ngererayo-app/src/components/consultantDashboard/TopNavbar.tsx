import React, { useEffect, useState } from "react";
import { Bell, User, LogOut, X, ChevronDown } from "lucide-react";
import { api } from "../../utilis/api"; 
import { useNavigate } from "react-router-dom";

interface UserRole {
  id: number;
  name: string;
}

const TopNavbar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch user profile if token exists
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      api
        .get("/accounts/current-user/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsername(res.data.username || res.data.email);
          setRole(res.data.role || []);
        })
        .catch(() => {
          setUsername(null);
          setRole([]);
        });
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login"); // redirect to login
  };

  // ✅ Helper to check roles
  const hasRole = (name: string) => role.some(r => r.name === name);

  return (
    <>
      {/* Top Navbar */}
      <header className="bg-white shadow px-4 py-3 flex justify-between items-center relative">
        <h1 className="text-lg font-semibold">Consultant Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <User size={20} />
              <span className="text-gray-700 font-medium">
                {username ? username : "Loading..."}
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-500 rounded-lg shadow-lg z-50">
                <h2 className="text-center p-3 border-b border-gray-500">Accounts</h2>
                {/* Buyer dashboard link */}
                {hasRole("buyer") && (
                  <button
                    onClick={() => {
                      navigate("/buyer");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Buyer Dashboard
                  </button>
                )}
                 {/* Buyer dashboard link */}
                {hasRole("farmer") && (
                  <button
                    onClick={() => {
                      navigate("/seller-dashboard");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Seller Dashboard
                  </button>
                )}

                {/* Become a buyer link (only if NOT buyer) */}
                {!hasRole("buyer") && (
                  <button
                    onClick={() => {
                      navigate("/become-buyer");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Become a Buyer
                  </button>
                )}

                {/* Logout */}
                <button
                  onClick={() => {
                    setShowLogoutModal(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 cursor-pointer text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbar;
