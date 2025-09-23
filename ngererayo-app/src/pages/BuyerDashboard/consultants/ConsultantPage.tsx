import React, { useState } from "react";
import ConsultantPeople from "../../../components/buyerdashboard/consultants/ConsultantPeople";
import ConsultantPosts from "../../../components/buyerdashboard/consultants/ConsultantPosts";

const ConsultantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"people" | "posts">("people");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Consultant Hub</h1>
        <p className="text-gray-600 mt-2">Connect with experts and explore their insights</p>
      </div>

      {/* Mini Nav Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("people")}
          className={`px-4 py-3 font-medium text-lg relative ${
            activeTab === "people"
              ? "text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Consultants
          {activeTab === "people" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-4 py-3 font-medium text-lg relative ml-4 ${
            activeTab === "posts"
              ? "text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Posts
          {activeTab === "posts" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"></span>
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === "people" ? <ConsultantPeople /> : <ConsultantPosts />}
    </div>
  );
};

export default ConsultantPage;