import React from "react";
import useAuth from "../../../Hook/useAuth";

const AdminProfile = () => {
  const { user, loading, userRole } = useAuth(); // Assuming you have user info and loading state

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-primary object-cover"
        />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold">
            {user?.displayName || "No Name"}
          </h3>
          <p className="text-gray-600">
            <strong>Role:</strong> {userRole?.role || "Student"}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {user?.phone || "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
