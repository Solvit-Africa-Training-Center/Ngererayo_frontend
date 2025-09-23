import { useEffect, useState } from "react";
import { api } from "../../utilis/api";

export const useMessages = (productId: number | null, token: string | null) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId || !token) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/market/messages/${productId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [productId, token]);

  return { messages, loading };
};
