import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/landingpage/Footer";
import OwnerProductsTable from "../../components/sellerDashboard/ProductListings";
import Header from "./sellerHeader";
import { api } from "../../utilis/api";
import AddNewProduct from "../../components/sellerDashboard/addNewProduct";
import { toast, Toaster } from "react-hot-toast";

interface CurrentUser {
  id: number;
  first_name: string;
  last_name: string;
  location?: string; // fallback if owner missing
  owner_id?: number; // 👈 add owner_id
}

const SellerProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

const fetchCurrentUser = async () => {
  try {
    const res = await api.get("/accounts/current-user/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Fetched current user:", res.data);

    setCurrentUser({
      id: res.data.id, // user id
      first_name: res.data.first_name,
      last_name: res.data.last_name,
      location: res.data.owner?.location || "N/A", 
      owner_id: res.data.owner?.id, // 👈 store owner id separately
    });
  } catch (err) {
    console.error("Error fetching current user:", err);
    toast.error("Failed to load user data. Please log in again.");
    navigate("/login");
  } finally {
    setLoading(false);
  }
};


    fetchCurrentUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Could not load your products.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Header />
      <Toaster position="top-right" />
      <div className="py-20 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Products</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 rounded p-2 text-white cursor-pointer"
          >
            Add new product
          </button>
        </div>

        {/* Owner products table */}
        <OwnerProductsTable
        ownerId={currentUser.owner_id!} // 👈 use owner id
        ownerName={`${currentUser.first_name} ${currentUser.last_name}`}
        ownerLocation={currentUser.location || "N/A"}
      />
      
      </div>

      <Footer />

      {/* Modal */}
      {showModal && (
        <AddNewProduct
          onClose={() => setShowModal(false)}
          onProductAdded={() => {
            toast.success("Product added successfully!");
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SellerProductsPage;
