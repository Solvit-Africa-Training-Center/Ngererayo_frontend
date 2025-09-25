import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utilis/api";
import OwnerProductsTable, { Product } from "../../components/sellerDashboard/ManageDiscount/productlist";
import { toast } from "react-toastify";
import DiscountModal from "../../components/sellerDashboard/ManageDiscount/DiscountModal";

const DiscountManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const tableRef = useRef<{ addProduct: (p: Product) => void }>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
          owner_id: res.data.owner?.id || null,
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

  if (loading) return <p>Loading user data...</p>;
  if (!currentUser || !currentUser.owner_id) {
    return <p className="text-red-500">No owner data found for current user.</p>;
  }

  return (
    <div className="py-10 px-4">
      <h2 className="text-xl font-bold mb-4">Manage Discounts</h2>
      <p className="text-gray-500 mb-6">Apply discounts to your products</p>

      <OwnerProductsTable
        ref={tableRef}
        ownerId={currentUser.owner_id}
        ownerName={`${currentUser.first_name} ${currentUser.last_name}`}
        ownerLocation={currentUser.location}
        onDiscountClick={(product) => setSelectedProduct(product)}
      />

      {/* Discount Modal */}
      {selectedProduct && (
        <DiscountModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSuccess={() => {
            toast.success("Discount applied successfully!");
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default DiscountManagementPage;
