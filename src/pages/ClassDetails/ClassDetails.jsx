import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchClassById = async (id) => {
  const res = await axios.get(`/api/classes/${id}`);
  return res.data;
};

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: classData, isLoading, error } = useQuery({
    queryKey: ["class", id],
    queryFn: () => fetchClassById(id),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load class details.</p>;

  const {
    title,
    name,
    image,
    price,
    description,
    totalEnrollment,
  } = classData || {};

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img src={image} alt={title} className="w-full h-80 object-cover rounded-lg shadow-md" />
        
        <div>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">Instructor: <span className="font-semibold">{name}</span></p>
          <p className="text-gray-500 mb-4">{description}</p>
          <p className="text-lg font-medium">Price: <span className="text-blue-600">${price}</span></p>
          <p className="text-sm text-gray-500 mb-4">Total Enrolled: {totalEnrollment}</p>
          <button
            onClick={() => navigate(`/payment/${id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
