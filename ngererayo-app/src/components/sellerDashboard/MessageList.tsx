import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MoreVertical } from "lucide-react";
import { useMessages } from "../../Hooks/SellerDashboard/useMessages";

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

const ReplyItem: React.FC<{ reply: Reply }> = ({ reply }) => (
  <div className="ml-4 mt-2 text-sm text-gray-700 bg-gray-100 p-2 rounded">
    <span className="font-medium">Replied to {reply.reply_message}:</span> {reply.message}{" "}
    <span className="text-xs text-gray-400">({new Date(reply.created_at).toLocaleTimeString()})</span>
  </div>
);

const MessageItem: React.FC<{
  msg: Message;
  replyText: string;
  setReplyText: (text: string) => void;
  handleReply: (messageId: number) => void;
}> = ({ msg, replyText, setReplyText, handleReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <div className="p-4 mb-4 rounded bg-gray-50 border relative">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-800">{msg.message}</p>
          <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</span>
        </div>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Replies */}
      {msg.replies?.map((rep) => (
        <ReplyItem key={rep.id} reply={rep} />
      ))}

      {/* Reply input */}
      {showReplyInput && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to ${msg.sender}...`}
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
          <button
            onClick={() => handleReply(msg.id)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

const MessageList: React.FC<{ productId: number; token: string }> = ({ productId, token }) => {
  const { messages, loading, refetch } = useMessages(productId, token);
  const navigate = useNavigate();
  const [replyTextMap, setReplyTextMap] = useState<{ [key: number]: string }>({});
  const wsRef = useRef<WebSocket | null>(null);

  // WebSocket setup
  useEffect(() => {
    if (!productId) return;

    const ws = new WebSocket(`wss://ngererayo-backend.onrender.com/ws/chat/${productId}/?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Update messages in real-time
      if (data.parent) {
        refetch?.(); // or update state manually to attach reply
      } else {
        refetch?.(); // top-level message
      }
    };

    ws.onclose = () => console.log("❌ WebSocket disconnected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => ws.close();
  }, [productId, token]);

  const handleReply = (messageId: number) => {
    const text = replyTextMap[messageId];
    if (!text || !wsRef.current) return;

    wsRef.current.send(JSON.stringify({ message: text, parent: messageId }));
    toast.success("Reply sent!");
    setReplyTextMap({ ...replyTextMap, [messageId]: "" });
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="p-10">
      <button
        onClick={() => navigate("/seller-dashboard/messaging")}
        className="text-blue-600 cursor-pointer hover:underline mb-4"
      >
        &larr; Back to Products
      </button>

      <h3 className="font-medium mb-4">Messages</h3>

      {messages
        .filter((msg) => !msg.parent)
        .map((msg) => (
          <MessageItem
            key={msg.id}
            msg={msg}
            replyText={replyTextMap[msg.id] || ""}
            setReplyText={(text) => setReplyTextMap({ ...replyTextMap, [msg.id]: text })}
            handleReply={handleReply}
          />
        ))}
    </div>
  );
};

export default MessageList;
