import React, { useEffect, useState } from "react";
import { api } from "../../utilis/api";


interface Consultant {
  id: number;
  user: string;
  location: string;
  followers_count: number;
  avatar?: string;
}

interface Post {
  id: number;
  post_title: string;
  post_description: string;
  post_image?: string;
  created_at: string;
}

const BASE_URL = "https://ngererayo-backend.onrender.com";

const ConsultantOverview: React.FC = () => {
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    api
      .get("/accounts/current-user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setConsultant(res.data.consultant);

        return api.get(`/market/consultants/${res.data.consultant.id}/posts/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => {
        // Only keep last 3 posts for overview
        setPosts(
  [...res.data].sort(
    (a: Post, b: Post) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 3)
);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching overview:", err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p>Loading overview...</p>;
  if (!consultant) return <p>No consultant data found.</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
        {consultant.avatar ? (
          <img
            src={consultant.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl font-bold">{consultant.user[0]}</span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold">{consultant.user}</h2>
          <p className="text-gray-600">{consultant.location}</p>
          <p className="text-sm text-gray-500">
            Followers: {consultant.followers_count}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">{posts.length}</h3>
          <p className="text-sm text-gray-600">Total Posts</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">
            {consultant.followers_count}
          </h3>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">-</h3>
          <p className="text-sm text-gray-600">Engagement</p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recent Posts</h3>
        
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                {post.post_image && (
                  <img
                    src={`${BASE_URL}${post.post_image}`}
                    alt={post.post_title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="font-semibold">{post.post_title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.post_description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    
    </div>
  );
};

export default ConsultantOverview;
