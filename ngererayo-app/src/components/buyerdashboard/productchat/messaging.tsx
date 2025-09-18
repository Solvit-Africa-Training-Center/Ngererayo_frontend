import React, { useState, useEffect } from "react";
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../pages/BuyerDashboard/DashboardHeader";
import { api } from "../../../utilis/api";

const ProductChat: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const [messages, setMessages] = useState<
    { id: number; sender: "me" | "seller"; text: string; time: string; status?: string }[]
  >([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");

  // Fetch history when page loads or productId changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!productId || !token) return;
      try {
        const response = await api.get(
          `/market/messages/${productId}/you-sent/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // If API returns msg.sender_id or msg.is_mine, adjust accordingly
        const formatted = response.data.map((msg: any) => ({
          id: msg.id,
          sender: msg.is_mine ? "me" : "seller", // 👈 use a flag from API
          text: msg.message,
          time: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(formatted);
      } catch (error: any) {
        console.error("Failed to load messages:", error.response?.data || error.message);
      }
    };

    fetchMessages();
  }, [productId, token]);

  const handleSend = async () => {
    if (!input.trim() || !productId || !token) {
      console.warn("No input, token or missing productId:", { input, productId, token });
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "me" as const,
      text: input,
      time: "Now",
      status: "pending",
    };

    // Optimistic update
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      setLoading(true);

      const response = await api.post(
        `/market/messages/${productId}/send/`,
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update message status to sent
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? {
                ...msg,
                status: "sent",
                id: response.data.id,
                time: new Date(response.data.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
            : msg
        )
      );
    } catch (error: any) {
      console.error("Failed to send message:", error.response?.data || error.message);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "failed" } : msg
        )
      );

      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
        <div className="flex items-center gap-3">
          <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
          <div>
            <h2 className="font-semibold">Green Valley Farms</h2>
            <p className="text-sm">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Phone size={20} />
          <Video size={20} />
          <MoreVertical size={20} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.sender === "me"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-xs text-gray-400 mt-1">
                {msg.time}
                {msg.sender === "me" && msg.status === "pending" && " • ..."}
                {msg.sender === "me" && msg.status === "failed" && " • Failed"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 border-t bg-white px-3 py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none disabled:bg-gray-100"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductChat;
