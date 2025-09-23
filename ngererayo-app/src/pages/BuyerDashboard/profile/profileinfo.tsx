import React from "react";

interface UserRole {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string | UserRole[]; // can be string or array
  first_name?: string;
  last_name?: string;
}


interface Props {
  user: User | null;
  loading: boolean;
}

const ProfileInfo: React.FC<Props> = ({ user, loading }) => {
  if (loading) return <p className="text-center py-10 text-gray-600">Loading profile...</p>;
  if (!user) return <p className="text-center py-10 text-red-500">Failed to load profile.</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Username</p>
          <p className="text-lg font-semibold text-gray-800">{user.username}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-lg font-semibold text-gray-800">{user.email}</p>
        </div>
       <div className="space-y-1">
         <p className="text-sm font-medium text-gray-500">Role</p>
         <p className="text-lg font-semibold text-gray-800 capitalize">
           {Array.isArray(user.role)
             ? user.role.map(r => r.name).join(", ")   // show multiple roles
             : user.role}
         </p>
       </div>
       
        {user.first_name && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">First Name</p>
            <p className="text-lg font-semibold text-gray-800">{user.first_name}</p>
          </div>
        )}
        {user.last_name && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Last Name</p>
            <p className="text-lg font-semibold text-gray-800">{user.last_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;