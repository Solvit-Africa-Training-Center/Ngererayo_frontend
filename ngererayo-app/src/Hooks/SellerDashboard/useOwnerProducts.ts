import { useEffect, useState } from "react";
import { api } from "../../utilis/api";

export const useOwnerProducts = (ownerId: number | null, token: string | null) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ownerId || !token) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/market/owner/${ownerId}/products/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [ownerId, token]);

  return { products, loading };
};
