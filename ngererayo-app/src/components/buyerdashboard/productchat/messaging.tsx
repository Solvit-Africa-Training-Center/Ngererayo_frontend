import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utilis/api";

interface Reply {
  id: number;
  message: string;
  created_at: string;
  reply_message: string;
}

interface Message {
  id: number;
  sender: string;
  message: string;
  created_at: string;
  is_mine: boolean;
  parent: number | null;
  replies?: Reply[];
}

const ProductChat: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const token = sessionStorage.getItem("token");

  const wsUrl = `wss://ngererayo-backend.onrender.com/ws/chat/${productId}/?token=${token}`;


  // Fetch message history
  useEffect(() => {
    if (!productId || !token) return;

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/market/messages/${productId}/you-sent/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted: Message[] = response.data.map((msg: any) => ({
          id: msg.id,
          sender: msg.sender,
          message: msg.message,
          created_at: msg.created_at,
          is_mine: msg.is_mine,
          parent: msg.parent,
          replies: msg.replies || [],
        }));

        setMessages(formatted);
      } catch (error: any) {
        console.error("Failed to load messages:", error.response?.data || error.message);
      }
    };

    fetchMessages();
  }, [productId, token]);

  // WebSocket setup
  useEffect(() => {
    if (!productId) return;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      setWsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prev) => {
        if (data.parent) {
          // It's a reply → attach to parent
          return prev.map((msg) =>
            msg.id === data.parent
              ? {
                  ...msg,
                  replies: [
                    ...(msg.replies || []),
                    {
                      id: data.id,
                      message: data.message,
                      created_at: data.created_at,
                      reply_message: data.sender,
                    },
                  ],
                }
              : msg
          );
        } else {
          // Normal message
          return [
            ...prev,
            {
              id: data.id,
              sender: data.sender,
              message: data.message,
              created_at: data.created_at,
              is_mine: false,
              parent: null,
              replies: [],
            },
          ];
        }
      });
    };

    ws.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setWsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setWsConnected(false);
    };

    return () => ws.close();
  }, [productId]);

  const sendWSMessage = (data: any) => {
    if (!wsRef.current) return;
    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      wsRef.current.addEventListener(
        "open",
        () => wsRef.current?.send(JSON.stringify(data)),
        { once: true }
      );
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const tempMessage: Message = {
      id: Date.now(),
      sender: "me",
      message: input,
      created_at: new Date().toISOString(),
      is_mine: true,
      parent: null,
      replies: [],
    };

    setMessages((prev) => [...prev, tempMessage]);

    sendWSMessage({ message: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
  

      <div className="flex items-center justify-between bg-green-700 text-white px-4 py-3">
        <div className="flex items-center gap-3">
          <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
          <div>
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
      <div className="px-60">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages
          .filter((msg) => !msg.parent)
          .map((msg) => (
            <div key={msg.id}>
              <div className={`flex ${msg.is_mine ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.is_mine
                      ? "bg-white text-white rounded-br-none"
                      : "bg-green-300 text-gray-800 rounded-bl-none shadow"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="block text-xs text-gray-400 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {msg.replies?.map((rep) => (
                <div key={rep.id} className="flex justify-start ml-6 mt-1">
                  <div className="max-w-xs px-3 py-2 bg-white text-gray-800 rounded-xl rounded-bl-none">
                    <span className="block text-xs text-gray-500 mb-1">
                      Replied to {rep.reply_message}
                    </span>
                    <p>{rep.message}</p>
                    <span className="block text-xs text-gray-400 mt-1">
                      {new Date(rep.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-gray-500 bg-white px-3 py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={!wsConnected}
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none disabled:bg-gray-100"
        />
        <button
          onClick={handleSend}
          disabled={!wsConnected}
          className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default ProductChat;
