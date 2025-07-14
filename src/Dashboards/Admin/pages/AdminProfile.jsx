// AdminProfile.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminProfile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => (await axios.get("/api/users/me")).data,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <img
        src={user.image}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold text-center mb-2">{user.name}</h2>
      <p className="text-center">Role: {user.role}</p>
      <p className="text-center">Email: {user.email}</p>
      <p className="text-center">Phone: {user.phone || "N/A"}</p>
    </div>
  );
};

export default AdminProfile;
