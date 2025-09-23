import React, { useState, useEffect } from "react";
import PostsTable from "../../components/consultantDashboard/PostsListTable";
import PostForm from "../../components/consultantDashboard/AddEditPostForm";
import { api } from "../../utilis/api";
import { toast } from "react-hot-toast";

const ConsultantDashboardPage: React.FC = () => {
  const [consultantId, setConsultantId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch current consultant's ID
  useEffect(() => {
    const fetchConsultantId = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await api.get("/accounts/current-user/", {
          headers: { Authorization: `Bearer ${token}` },
        });
      console.log(res.data)
        setConsultantId(res.data.consultant.id);

      } catch (err) {
        console.error(err);
        toast.error("Failed to get consultant info");
      }
    };

    fetchConsultantId();
  }, []);

  if (!consultantId) return <p>Loading...</p>;

  return (
    <div className="p-6 relative">
      
      <PostsTable consultantId={consultantId} />

      
    </div>
  );
};

export default ConsultantDashboardPage;
