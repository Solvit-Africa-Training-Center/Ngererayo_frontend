// pages/SellerDashboard/AddProductPage.tsx
import React, { useEffect, useState } from "react";
import AddProductForm from "../../components/sellerDashboard/addNewProduct";
import Header from "./sellerHeader";
import Footer from "../../components/landingpage/Footer";
import { api } from "../../utilis/api";

const AddProductPage: React.FC = () => {
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    api
      .get("/accounts/current-user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOwnerId(res.data.id); 
      })
      .catch((err) => {
        console.error("Failed to get current user:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!ownerId) return <p className="text-center mt-10 text-red-500">Failed to get user info.</p>;

  return (
    <div>
      <Header />
      <div className="py-20">
        <AddProductForm ownerId={ownerId} />
      </div>
      <Footer />
    </div>
  );
};

export default AddProductPage;
