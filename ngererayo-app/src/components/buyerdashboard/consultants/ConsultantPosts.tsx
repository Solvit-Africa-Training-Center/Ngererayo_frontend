import React, { useEffect, useState } from "react";
import { api } from "../../../utilis/api";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  User, 
  MapPin, 
  Users, 
  Calendar,
  Eye,
  Bookmark
} from "lucide-react";

// Base URL of your backend (Django on Render)
const BASE_URL = "https://ngererayo-backend.onrender.com";

// Types
interface Consultant {
  id: number;
  user: string;
  location: string;
  followers_count: number;
  profile_image?: string;
}

interface ConsultantPost {
  id: number;
  consultant: number;
  post_title: string;
  post_description: string;
  post_image?: string;
  created_at: string;
  likes_count?: number;
  comments_count?: number;
  views_count?: number;
}

const ConsultantPosts: React.FC = () => {
  const [posts, setPosts] = useState<ConsultantPost[]>([]);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

 const token = sessionStorage.getItem("token"); // or wherever you store it

const fetchData = async () => {
  try {
    const [postsRes, consultantsRes] = await Promise.all([
      api.get("/market/consultants/following/post/", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }),
      api.get("/market/consultants/", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }),
    ]);
    setPosts(postsRes.data);
    setConsultants(consultantsRes.data);
  } catch (err) {
    console.error("Error fetching posts/consultants", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);


  // Helper to map consultant ID to consultant object
  const getConsultant = (id: number) => {
    return consultants.find((c) => c.id === id);
  };

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleShare = async (post: ConsultantPost) => {
    const consultant = getConsultant(post.consultant);
    const shareData = {
      title: post.post_title,
      text: post.post_description.substring(0, 100) + '...',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareData.url);
      alert('Post link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (loading) {
    return (
      <div className="">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-48 bg-gray-200 rounded-xl mt-4"></div>
                <div className="flex justify-between mt-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="text-green-500" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Consultants haven't shared any posts yet. Check back later for updates and farming insights!
        </p>
      </div>
    );
  }

  return (
    <div className="">
      {posts.map((post) => {
        const consultant = getConsultant(post.consultant);
        const isLiked = likedPosts.has(post.id);
        const isSaved = savedPosts.has(post.id);

        return (
          <div className="">

       
          <div
            key={post.id}
            className="bg-white  m-2 rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Post Header */}
            <div className="p-6 border-b border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {consultant ? (
                      consultant.profile_image ? (
                        <img
                          src={`${BASE_URL}${consultant.profile_image}`}
                          alt={consultant.user}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        consultant.user.charAt(0).toUpperCase()
                      )
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {consultant ? consultant.user : `Consultant #${post.consultant}`}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      {consultant && (
                        <>
                          <MapPin size={12} />
                          <span>{consultant.location}</span>
                          <span>•</span>
                        </>
                      )}
                      <Calendar size={12} />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                </div>
             
              </div>
            </div>

         

            {/* Post Image */}
            {post.post_image && (
              <div className="px-6 pb-6">
                <img
                  src={`${BASE_URL}${post.post_image}`}
                  alt={post.post_title}
                  className="w-full h-80 object-cover rounded-xl shadow-md"
                />
              </div>
            )}
               {/* Post Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {post.post_title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.post_description}
              </p>
            </div>
            {/* Post Stats
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{post.views_count || 0} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    <span>{post.comments_count || 0} comments</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={14} className={isLiked ? "text-red-500 fill-current" : ""} />
                  <span>{post.likes_count || 0} likes</span>
                </div>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={18} className={isLiked ? "fill-current" : ""} />
                    <span className="font-medium">{isLiked ? 'Liked' : 'Like'}</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <MessageCircle size={18} />
                    <span className="font-medium">Comment</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
               

                  <button
                    onClick={() => handleShare(post)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
              </div>
          </div>
        );
      })}
    </div>
     
  );
};

export default ConsultantPosts;