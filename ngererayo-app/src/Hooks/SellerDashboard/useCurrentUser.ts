import { useEffect, useState } from "react";
import { api } from "../../utilis/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useCurrentUser = (token: string | null) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

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
  }, [token, navigate]);

  return { currentUser, loading };
};
