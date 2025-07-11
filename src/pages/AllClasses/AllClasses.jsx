import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";

const demoClasses = [
  {
    _id: "1",
    title: "Full Stack Web Development",
    name: "John Doe",
    image: "https://images.unsplash.com/photo-1559027615-8e0426b3815c",
    price: 199,
    description: "Learn to build full stack apps with MongoDB, Express, React, and Node.js.",
    totalEnrollment: 120,
    status: "approved"
  },
  {
    _id: "2",
    title: "Digital Marketing Mastery",
    name: "Jane Smith",
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33",
    price: 149,
    description: "Master SEO, Google Ads, and Social Media Marketing from scratch.",
    totalEnrollment: 85,
    status: "approved"
  },
  {
    _id: "3",
    title: "Graphic Design for Beginners",
    name: "Alice Johnson",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    price: 99,
    description: "Start your graphic design journey with Adobe Photoshop and Illustrator.",
    totalEnrollment: 60,
    status: "approved"
  },
  {
    _id: "4",
    title: "Python Programming Essentials",
    name: "Robert Williams",
    image: "https://images.unsplash.com/photo-1584697964403-ec7bd5ed7f6e",
    price: 129,
    description: "A beginner-friendly course to learn Python fundamentals and logic.",
    totalEnrollment: 100,
    status: "approved"
  },
  {
    _id: "5",
    title: "UI/UX Design Bootcamp",
    name: "Emily Brown",
    image: "https://images.unsplash.com/photo-1606312611799-81d5e314ed4e",
    price: 189,
    description: "Design engaging, user-friendly interfaces using Figma and Adobe XD.",
    totalEnrollment: 75,
    status: "approved"
  }
];

const AllClasses = () => {
  // Fetch approved classes
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await axios.get("/api/classes?status=approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Approved Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoClasses.map((cls) => (
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
              <p className="text-sm text-gray-700">{cls.description.slice(0, 100)}...</p>
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="font-bold text-blue-600">${cls.price}</span>
                <span className="text-gray-500">Enrolled: {cls.totalEnrolled || 0}</span>
              </div>
              <Link
                to={`/class/${cls._id}`}
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
