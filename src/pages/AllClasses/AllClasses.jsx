import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axiosPublic from "../../Service/AxiosPublic";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AllClasses = () => {
  // Fetch approved classes
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/ApprovedClasses");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (classes.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
          No Classes Available 😞
        </h2>
        <p className="text-lg text-gray-700">
          Sorry, there are currently no approved classes to display. Please
          check back later!
        </p>
      </div>
    );
  }
console.log(classes)
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Approved Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border hover:shadow-xl transition"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{cls.title}</h3>
              <p className="text-sm text-gray-600">
                <strong>Instructor:</strong> {cls.name}
              </p>
              <p className="text-sm text-gray-700">
                {cls.description.slice(0, 100)}...
              </p>
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="font-bold text-blue-600">${cls.price}</span>
                <span className="text-gray-500">
                  Enrolled: {cls.totalEnrollment || 0}
                </span>
              </div>
              <Link
                to={`/classDetails/${cls._id}`}
                className="mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
              >
                Enroll
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
