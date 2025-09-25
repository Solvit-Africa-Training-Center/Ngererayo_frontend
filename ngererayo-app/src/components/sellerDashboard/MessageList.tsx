import React, { useState } from "react";
import { useMessages } from "../../Hooks/SellerDashboard/useMessages";
import { api } from "../../utilis/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MoreVertical, ArrowLeft, MessageCircle, Send, User, Clock } from "lucide-react";

interface Reply {
  id: number;
  message: string;
  created_at: string;
  reply_message: string; // sender username
}

interface Message {
  id: number;
  sender: string;
  receiver: string;
  message: string;
  created_at: string;
  is_read: boolean;
  parent: number | null;
  replies?: Reply[];
}

// Enhanced Avatar component
const UserAvatar: React.FC<{ name: string; className?: string }> = ({ name, className = "" }) => {
  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const getGradient = (name: string) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500"
    ];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  return (
    <div className={`flex items-center justify-center rounded-full bg-gradient-to-r ${getGradient(name)} text-white font-bold shadow-lg ${className}`}>
      {getInitial(name)}
    </div>
  );
};

const ReplyItem: React.FC<{ reply: Reply }> = ({ reply }) => (
  <div className="ml-5 mt-3 pl-2 border-l-2 border-blue-200">
    <div className="bg-blue-50 rounded-2xl p-4 hover:bg-blue-100 transition-colors duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="bg-blue-100 p-1 rounded-full mr-2">
            <Send className="w-3 h-3 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-blue-700">Replied to {reply.reply_message}</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs">
          <Clock className="w-3 h-3 mr-1" />
          {new Date(reply.created_at).toLocaleString()}
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{reply.message}</p>
    </div>
  </div>
);

const MessageItem: React.FC<{
  msg: Message;
  token: string;
  replyText: string;
  setReplyText: (text: string) => void;
  handleReply: (messageId: number) => void;
}> = ({ msg, token, replyText, setReplyText, handleReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleReplyClick = async (messageId: number) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setIsSending(true);
    try {
      await handleReply(messageId);
      setShowReplyInput(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`p-2 mb-4 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
      msg.is_read ? 'bg-white border-gray-200' : 'bg-white border-green-200'
    }`}>
      {/* Message Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <UserAvatar name={msg.sender} className="w-10 h-10" />
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-800">{msg.sender}</h4>
             
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-3 h-3 mr-1" />
              <span>{new Date(msg.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className={`p-2 rounded-full transition-all duration-200 ${
            showReplyInput 
              ? 'bg-blue-100 text-blue-600' 
              : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
          }`}
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Message Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4 border-l-4 border-green-500">
          {msg.message}
        </p>
      </div>

      {/* Replies */}
      {msg.replies && msg.replies.length > 0 && (
        <div className="mb-4">
       
          {msg.replies.map((rep) => (
            <ReplyItem key={rep.id} reply={rep} />
          ))}
        </div>
      )}

      {/* Reply Input */}
      {showReplyInput && (
        <div className="mt-4 p-2 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Replying to {msg.sender}</span>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Type your reply to ${msg.sender}...`}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleReplyClick(msg.id)}
                disabled={isSending}
                className="flex items-center justify-center px-4 py-3 bg-green-700 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 font-medium"
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1" />
                    Send
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowReplyInput(false);
                  setReplyText("");
                }}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MessageList: React.FC<{ productId: number; token: string }> = ({ productId, token }) => {
  const { messages, loading, refetch } = useMessages(productId, token);
  const navigate = useNavigate();
  const [replyTextMap, setReplyTextMap] = useState<{ [key: number]: string }>({});

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-2">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 mb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleReply = async (messageId: number) => {
    const text = replyTextMap[messageId];
    if (!text.trim()) return;
    
    try {
      await api.post(`/market/messages/${messageId}/reply/`, { message: text }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Reply sent successfully!");
      setReplyTextMap({ ...replyTextMap, [messageId]: "" });
      refetch?.(); // refresh messages
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply");
    }
  };

  const parentMessages = messages.filter((msg) => !msg.parent);

  return (
    <div className="min-h-screen bg-white p-2">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <button
                onClick={() => navigate("/seller-dashboard/messaging")}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4 sm:mb-0"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Products
              </button>
              <h1 className="text-l font-bold text-gray-800 mt-2">Product Messages</h1>
              <p className="text-gray-600 mt-1">Manage conversations for this product</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-blue-700">
                {parentMessages.length} conversation{parentMessages.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {parentMessages.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Messages Yet</h3>
                <p className="text-gray-500 max-w-md">
                  Customers haven't started any conversations about this product yet.
                  Messages will appear here when they do.
                </p>
              </div>
            </div>
          ) : (
            parentMessages.map((msg) => (
              <MessageItem
                key={msg.id}
                msg={msg}
                token={token}
                replyText={replyTextMap[msg.id] || ""}
                setReplyText={(text) => setReplyTextMap({ ...replyTextMap, [msg.id]: text })}
                handleReply={handleReply}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default MessageList;