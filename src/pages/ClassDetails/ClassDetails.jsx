import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../Service/AxiosPublic";
import axiosSecure from "../../Service/AxiosSecure";
import useAuth from "../../Hook/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";

const fetchClassInfo = async (id) => {
  const res = await axiosPublic.get(`/api/classDetails/${id}`);
  return res.data;
};

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: enrolledClassIds = [], isLoading: enrollmentLoading } =
    useQuery({
      queryKey: ["enrolledClassIds", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/api/user-enrollments?email=${user?.email}`
        );
        return res.data;
      },
      enabled: !!user?.email,
    });

  const {
    data: classData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["class-details", id],
    queryFn: () => fetchClassInfo(id),
  });
  
  // if (isLoading ) return <LoadingSpinner />;
  if (enrollmentLoading &&isLoading ) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading class details.</p>
    );

  const { title, price, description, image, category, experience, name } =
    classData || {};

  const isEnrolled = enrolledClassIds.includes(id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row gap-6">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
          />
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-gray-700 mb-2">
              <strong>Teacher:</strong> {name}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> {category}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Teacher Experience:</strong> {experience}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Price:</strong> ${price}
            </p>
            <h1 className="block font-bold">About The Class: </h1>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Pay Button */}
          <div className="mt-6">
            {isEnrolled ? (
              <button
                className="btn btn-primary w-full text-black cursor-not-allowed"
                disabled
              >
                Enrolled ✅
              </button>
            ) : (
              <button
                onClick={() => navigate(`/payFor/${id}`)}
                className="btn btn-primary w-full"
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
