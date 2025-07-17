import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import useAuth from "../../Hook/useAuth";
import axiosSecure from "../../Service/AxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";

const MyEnrollClasses = () => {
  const { user } = useAuth();
  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["enrolledClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-enrollments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      {enrolledClasses.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            You haven’t enrolled in any classes yet.
          </h2>
          <p className="text-gray-500 mb-6">
            Explore our courses and start learning today!
          </p>
          <Link
            to="/AllClasses"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Browse Classes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(enrolledClasses) &&
            enrolledClasses.map((cls) => (
              <div
                key={cls._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border"
              >
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Instructor: {cls.name}
                  </p>
                  <Link
                    to={`/dashboard/myenroll-class/${cls._id}`}
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrollClasses;
