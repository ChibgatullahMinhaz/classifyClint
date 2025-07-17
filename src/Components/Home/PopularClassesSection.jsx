import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Users, Clock } from "lucide-react";
import axiosSecure from "../../Service/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

const PopularClassesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  // Fetch classes
  const { data: classes = [] } = useQuery({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/popular");
      return res.data;
    },
  });

  const itemsToShow = 3;
  const maxIndex = Math.max(0, classes.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleClasses = classes.slice(
    currentIndex,
    currentIndex + itemsToShow
  );
  const handleNavigate = (item) => {
    navigate(`/classDetails/${item._id}`);
  };
  return (
    <section id="classes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Classes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most enrolled courses taught by industry experts
          </p>
        </div>

        {/* Classes Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`hidden sm:flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            <div className="text-sm text-gray-500">
              Showing {currentIndex + 1}-
              {Math.min(currentIndex + itemsToShow, classes.length)} of{" "}
              {classes.length} courses
            </div>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`hidden sm:flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="group border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-semibold text-gray-700">
                    {classItem.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-bold text-gray-900">
                    ${classItem.price}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors cursor-pointer">
                    {classItem.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {classItem.description}
                  </p>
                  <div className="text-sm text-gray-700 mb-4">
                    by <span className="font-medium">{classItem.name}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">{classItem.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{classItem.enrollment}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{classItem.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleNavigate(classItem)}
                    className="w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white font-semibold rounded-md hover:shadow-lg transition-shadow duration-300"
                    type="button"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center space-x-4 mt-8 sm:hidden">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition-colors duration-300"
            type="button"
          >
            View All Classes
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularClassesSection;
