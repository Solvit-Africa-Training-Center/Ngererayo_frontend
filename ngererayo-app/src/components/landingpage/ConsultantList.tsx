// components/market/ConsultantList.tsx
import React, { useEffect, useState } from "react";
import { api } from "../../utilis/api";
import { toast } from "react-hot-toast";

interface Consultant {
  id: number;
  user: string;
  location: string;
  followers_count: number;
}

const ConsultantList: React.FC = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/market/consultants/")
      .then((res) => setConsultants(res.data))
      .catch(() => toast.error("Failed to fetch consultants"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading consultants...</p>;
  if (consultants.length === 0) return <p className="text-gray-500">No consultants found.</p>;

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex space-x-4 animate-scroll-x">
        {consultants.map((consultant) => (
          <div
            key={consultant.id}
            className="min-w-[220px] p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{consultant.user}</h2>
            <p className="text-sm text-gray-600">{consultant.location}</p>
            <p className="text-sm text-gray-500">
              Followers: {consultant.followers_count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultantList;
