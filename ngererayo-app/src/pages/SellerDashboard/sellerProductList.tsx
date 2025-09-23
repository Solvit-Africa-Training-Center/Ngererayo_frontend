import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OwnerProductsTable, { Product } from "../../components/sellerDashboard/ProductListings";
import { api } from "../../utilis/api";
import AddNewProduct from "../../components/sellerDashboard/addNewProduct";
import { toast } from "react-toastify";   // ✅


const SellerProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const tableRef = useRef<{ addProduct: (p: Product) => void }>(null); // 👈 ref to access addProduct
  const [currentUser, setCurrentUser] = useState<any>(null);
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

        setCurrentUser({
          id: res.data.id,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          location: res.data.owner?.location || "N/A",
          owner_id: res.data.owner?.id,
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

  if (loading) return <p>Loading...</p>;
  if (!currentUser) return <p className="text-red-500">Could not load your products.</p>;

  return (
    <div className="relative">
    
      <div className="py-10 px-1">
        <div className="flex justify-between items-center mb-6 px-3">
          <div>
            <h2 className="text-2xl font-bold">My Products</h2>
            <p className="text-gray-500">My products available on the marketplace</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 rounded p-2 text-white cursor-pointer"
          >
            Add new product
          </button>
        </div>

        {/* ✅ attach ref instead of prop */}
        <OwnerProductsTable
          ref={tableRef}
          ownerId={currentUser.owner_id!}
          ownerName={`${currentUser.first_name} ${currentUser.last_name}`}
          ownerLocation={currentUser.location || "N/A"}
        />
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <AddNewProduct
          onClose={() => setShowModal(false)}
          onProductAdded={(newProduct) => {
            tableRef.current?.addProduct(newProduct); // ✅ call method from ref
            toast.success("Product added successfully!");
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SellerProductsPage;
