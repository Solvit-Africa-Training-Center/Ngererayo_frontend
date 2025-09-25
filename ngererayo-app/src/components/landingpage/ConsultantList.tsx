// components/market/ConsultantList.tsx
import React, { useEffect, useState } from "react";
import { api } from "../../utilis/api";
import { toast } from "react-hot-toast";

interface Consultant {
  id: number;
  user: string;
  location: string;
  followers_count: number;
  bio?: string;
  expertise?: string[];
}

// Enhanced Avatar component with gradient backgrounds
const UserAvatar: React.FC<{ name: string; className?: string }> = ({ name, className = "" }) => {
  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  // Different gradient backgrounds based on name hash
  const getGradient = (name: string) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-teal-500 to-blue-500"
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

const ConsultantList: React.FC = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState<Set<number>>(new Set());

  useEffect(() => {
    api
      .get("/market/consultants/")
      .then((res) => setConsultants(res.data))
      .catch(() => toast.error("Failed to fetch consultants"))
      .finally(() => setLoading(false));
  }, []);

  const handleFollow = (consultantId: number) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(consultantId)) {
        newSet.delete(consultantId);
        toast.success("Unfollowed consultant");
      } else {
        newSet.add(consultantId);
        toast.success("Following consultant");
      }
      return newSet;
    });
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Consultants</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="min-w-[280px] animate-pulse">
              <div className="bg-gray-200 rounded-2xl p-6 h-48"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (consultants.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Consultants Available</h3>
          <p className="text-gray-500">Check back later for expert consultants in your area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Expert Consultants</h2>
          <p className="text-gray-600 mt-2">Connect with industry experts for personalized guidance</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full mt-4 sm:mt-0">
          <span className="text-sm font-medium text-blue-700">
            {consultants.length} consultant{consultants.length !== 1 ? 's' : ''} available
          </span>
        </div>
      </div>

      {/* Consultants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {consultants.map((consultant) => (
          <div
            key={consultant.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
          >
            {/* Consultant Header */}
            <div className="relative">
              <div className="bg-yellow-500 to-indigo-600 h-20"></div>
              <div className="absolute -bottom-8 left-6">
                <UserAvatar name={consultant.user} className="w-16 h-16 text-xl border-4 border-white shadow-lg" />
              </div>
            </div>

            {/* Consultant Info */}
            <div className="pt-10 px-6 pb-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {consultant.user}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{consultant.location}</span>
                </div>
                
                {consultant.bio && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {consultant.bio}
                  </p>
                )}
              </div>

              {/* Expertise Tags */}
              {consultant.expertise && consultant.expertise.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {consultant.expertise.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {consultant.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{consultant.expertise.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Stats and Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {consultant.followers_count.toLocaleString()} followers
                  </span>
                </div>
                
               
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl pointer-events-none transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* View All Button for Mobile */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-medium shadow-sm">
          View All Consultants
          <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConsultantList;