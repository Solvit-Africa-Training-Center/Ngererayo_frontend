import React, { useEffect, useState } from "react";
import { api } from "../../../utilis/api";
import ConsultantCard from "./ConsultantCard";

interface Consultant {
  id: number;
  user: string;
  location: string;
  followers_count: number;
  avatar?: string;
}

const ConsultantPeople: React.FC = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/market/consultants/")
      .then((res) => {
        // Add mock avatar URLs for demonstration
        const consultantsWithAvatars = res.data.map((consultant: Consultant, index: number) => ({
          ...consultant,
          avatar: `https://i.pravatar.cc/150?u=${consultant.user}-${index}`
        }));
        setConsultants(consultantsWithAvatars);
      })
      .catch((err) => console.error("Error fetching consultants", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
  
  if (consultants.length === 0) return (
    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No consultants found</h3>
      <p className="mt-1 text-sm text-gray-500">Check back later for new consultants.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {consultants.map((consultant) => (
        <ConsultantCard key={consultant.id} consultant={consultant} />
      ))}
    </div>
  );
};

export default ConsultantPeople;