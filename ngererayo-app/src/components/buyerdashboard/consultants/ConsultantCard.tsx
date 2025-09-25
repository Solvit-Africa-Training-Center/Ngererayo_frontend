import React, { useEffect, useState } from "react";
import { api } from "../../../utilis/api";

interface Consultant {
  id: number;
  user: string;
  location: string;
  followers_count: number;
  avatar?: string;
}

interface Props {
  consultant: Consultant;
  onFollow?: () => void;
}

const ConsultantCard: React.FC<Props> = ({ consultant, onFollow }) => {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(consultant.followers_count);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const token = sessionStorage.getItem("token");

  // Fetch current logged-in user
  const fetchCurrentUser = async () => {
    if (!token) return;
    try {
      const res = await api.get("/accounts/current-user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUserId(res.data.id);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  // Check if current user follows this consultant
  const fetchFollowStatus = async () => {
    if (!token || currentUserId === null) return;
    try {
      const res = await api.get(`/market/consultants/${consultant.id}/followers/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const followed = res.data.some((f: any) => f.follower.id === currentUserId);
      setIsFollowing(followed);
    } catch (err) {
      console.error("Error fetching follow status:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId !== null) {
      fetchFollowStatus();
    }
  }, [currentUserId]);

  const handleToggleFollow = async () => {
    if (!token) {
      alert("You must be logged in to follow a consultant.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(
        `/market/consultants/${consultant.id}/follow/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Backend returns { followed: true/false }
      const followed = res.data?.followed ?? !isFollowing;
      setIsFollowing(followed);
      setFollowersCount(prev => prev + (followed ? 1 : -1));

      if (onFollow) onFollow();
    } catch (err) {
      console.error("Failed to toggle follow:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="h-24 w-24 rounded-full bg-green-800 flex items-center justify-center text-white text-3xl font-bold border-4 border-green-100">
           {consultant.user.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Name & Location */}
        <h3 className="text-xl font-bold text-gray-900">{consultant.user}</h3>
        <p className="text-gray-600 mt-1">{consultant.location}</p>

        {/* Followers */}
        <p className="text-gray-500 mt-2">{followersCount} followers</p>

        {/* Follow / Unfollow Button */}
        <button
          disabled={loading}
          onClick={handleToggleFollow}
          className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            isFollowing
              ? "bg-red-100 text-gray-600 hover:bg-gray-200"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {loading ? "Please wait..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default ConsultantCard;
