import React, { useEffect, useState } from "react";
import { api } from "../../../utilis/api";
import {
  Send,
  User,
  Clock,
  Reply,
  MessageSquare,
  Edit,
  Trash2,
  Save,
  X,
  Heart,
  Share,
  MoreVertical
} from "lucide-react";
import { toast } from "react-toastify";

interface Reply {
  id: number;
  user: string;
  comment: string;
  created_at: string;
  reply_text: string;
}

interface Comment {
  id: number;
  user: string;
  product: string;
  comment: string;
  created_at: string;
  replies?: Reply[];
}

interface Props {
  productId: string;
}

const ProductComments: React.FC<Props> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTexts, setReplyTexts] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [expandedReplies, setExpandedReplies] = useState<{ [key: number]: boolean }>({});
  const [editing, setEditing] = useState<{ type: "comment" | "reply"; id: number } | null>(null);
  const [editText, setEditText] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [showOptions, setShowOptions] = useState<number | null>(null);

  const token = sessionStorage.getItem("token");

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await api.get(`/market/comments/${productId}/`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch logged-in user
  const fetchCurrentUser = async () => {
    if (!token) return;
    try {
      const res = await api.get("/accounts/current-user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data.username);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  const handleSend = async () => {
    if (!newComment.trim()) return;
    try {
      await api.post(
        `/market/comments/${productId}/send/`,
        { comment: newComment },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      setNewComment("");
      fetchComments();
      toast.success("Comment sent successfully");
    } catch {
      toast.error("Failed to send comment");
    }
  };

  const handleReply = async (commentId: number) => {
    const replyText = replyTexts[commentId]?.trim();
    if (!replyText) return;

    try {
      await api.post(
        `/market/comments/${commentId}/reply/`,
        { comment: replyText },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      setReplyTexts({ ...replyTexts, [commentId]: "" });
      setExpandedReplies({ ...expandedReplies, [commentId]: false });
      fetchComments();
      toast.success("Reply sent successfully");
    } catch {
      toast.error("Failed to send reply");
    }
  };

  const handleEdit = (type: "comment" | "reply", id: number, text: string) => {
    setEditing({ type, id });
    setEditText(text);
    setShowOptions(null);
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    try {
      await api.put(
        `/market/comments/${editing.id}/edit/`,
        { comment: editText },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      setEditing(null);
      setEditText("");
      fetchComments();
      toast.success("Updated successfully");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await api.delete(`/market/comments/${id}/delete/`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      fetchComments();
      toast.success("Deleted successfully");
      setShowOptions(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

  const toggleReply = (commentId: number) => {
    setExpandedReplies({ ...expandedReplies, [commentId]: !expandedReplies[commentId] });
    setShowOptions(null);
  };

  const handleLike = (commentId: number) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const getUserInitials = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchComments();
  }, [productId]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-8 bg-green-500 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
          <p className="text-sm text-gray-500">Share your thoughts about this product</p>
        </div>
        <div className="ml-auto bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </div>
      </div>

      {/* New Comment Section */}
      <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
            {currentUser ? getUserInitials(currentUser) : <User size={20} />}
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none transition-all duration-200"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm text-gray-500">
                {newComment.length}/500 characters
              </div>
              <button
                onClick={handleSend}
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Send size={16} /> Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No comments yet</h3>
          <p className="text-gray-500">Be the first to share your thoughts about this product!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-all duration-200">
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {getUserInitials(comment.user)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{comment.user}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={12} />
                      <span>{formatTimeAgo(comment.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Options Menu */}
               {/* Options Menu - Only show for the owner */}
                {currentUser === comment.user && (
                  <div className="relative">
                    <button
                      onClick={() => setShowOptions(showOptions === comment.id ? null : comment.id)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                    
                    {showOptions === comment.id && (
                      <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[120px]">
                        <button
                          onClick={() => handleEdit("comment", comment.id, comment.comment)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
              </div>

              {/* Comment Content */}
              {editing?.type === "comment" && editing.id === comment.id ? (
                <div className="mb-4">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-green-600 transition-colors"
                    >
                      <Save size={14} /> Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-400 transition-colors"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mb-4 leading-relaxed">{comment.comment}</p>
              )}

              {/* Comment Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-sm ${
                      likedComments.has(comment.id) 
                        ? 'text-red-500' 
                        : 'text-gray-500 hover:text-red-500'
                    } transition-colors`}
                  >
                    <Heart size={16} className={likedComments.has(comment.id) ? "fill-current" : ""} />
                    Like
                  </button>
                  
                  {currentUser !== comment.user && (
                    <button
                      onClick={() => toggleReply(comment.id)}
                      className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors"
                    >
                      <Reply size={16} />
                      {expandedReplies[comment.id] ? "Cancel" : "Reply"}
                    </button>
                  )}
                  
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <Share size={16} />
                    Share
                  </button>
                </div>
              </div>

              {/* Reply Input */}
              {expandedReplies[comment.id] && currentUser !== comment.user && (
                <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyTexts[comment.id] || ""}
                      onChange={(e) => setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })}
                      placeholder="Write your reply..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
                      onKeyPress={(e) => e.key === 'Enter' && handleReply(comment.id)}
                    />
                    <button
                      onClick={() => handleReply(comment.id)}
                      disabled={!replyTexts[comment.id]?.trim()}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={14} /> Send
                    </button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-3 border-l-2 border-green-100 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-green-50 rounded-lg p-3 border border-green-100 hover:bg-green-100 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {getUserInitials(reply.user)}
                          </div>
                          <span className="font-medium text-green-700 text-sm">{reply.user}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(reply.created_at)}
                          </span>
                          
                          {/* Reply Options */}
                          {currentUser === reply.user && (
                            <div className="relative">
                              <button
                                onClick={() => setShowOptions(reply.id)}
                                className="p-1 rounded-full hover:bg-green-200 transition-colors"
                              >
                                <MoreVertical size={12} className="text-gray-400" />
                              </button>
                              
                              {showOptions === reply.id && (
                                <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[100px]">
                                  <button
                                    onClick={() => handleEdit("reply", reply.id, reply.comment)}
                                    className="flex items-center gap-2 w-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                                  >
                                    <Edit size={12} /> Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(reply.id)}
                                    className="flex items-center gap-2 w-full px-3 py-1 text-xs text-red-600 hover:bg-gray-50"
                                  >
                                    <Trash2 size={12} /> Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reply Content */}
                      {editing?.type === "reply" && editing.id === reply.id ? (
                        <div className="mt-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-300 resize-none"
                          />
                          <div className="flex gap-2 mt-1">
                            <button
                              onClick={handleSaveEdit}
                              className="bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1 hover:bg-green-600"
                            >
                              <Save size={12} /> Save
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1 hover:bg-gray-400"
                            >
                              <X size={12} /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 text-sm">{reply.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductComments;