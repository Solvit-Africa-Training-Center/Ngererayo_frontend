import React, { useState, useEffect } from "react";
import { api } from "../../utilis/api";
import { toast } from "react-toastify";   // ✅
import PostForm from "./AddEditPostForm";

interface Post {
  id: number;
  post_title: string;
  post_description: string;
  post_image: string;
}

interface PostsTableProps {
  consultantId: number;
}
// Base URL of your backend (Django on Render)
const BASE_URL = "https://ngererayo-backend.onrender.com";

const PostsTable: React.FC<PostsTableProps> = ({ consultantId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await api.get(`/market/consultants/${consultantId}/posts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API response:", res.data);

      setPosts(res.data.posts || res.data.results || res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = sessionStorage.getItem("token");
      await api.delete(`/market/consultants/posts/${postId}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Post deleted successfully");
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [consultantId]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-xl md:text-xl font-bold text-gray-800 mb-3">
            Consultant Posts Management
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create and manage your expert posts to share valuable insights with the agricultural community.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Posts</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-5 py-2 bg-green-800 text-white rounded-lg cursor-pointer font-medium shadow-md hover:shadow-lg transition duration-200"
            >
              Add New Post
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center">
                        <div className="flex justify-center items-center">
                          <svg className="animate-spin h-5 w-5 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-gray-600">Loading posts...</span>
                        </div>
                      </td>
                    </tr>
                  ) : posts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center">
                        <div className="text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p>No posts found. Create your first post!</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="hover:bg-blue-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`${BASE_URL}${post.post_image}`}
                            alt={post.post_title}
                            className="h-16 w-16 object-cover rounded-lg border border-gray-400"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{post.post_title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 line-clamp-2">{post.post_description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingPost(post)}
                              className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-100 transition duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-100 transition duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overlay for Add/Edit Post Form */}
          {(editingPost || showAddForm) && (
            <div className="overlay-fallback">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                  
                  </div>
                  <PostForm
                    post={editingPost}
                    consultantId={consultantId}
                    onSuccess={() => {
                      setEditingPost(null);
                      setShowAddForm(false);
                      fetchPosts();
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsTable;