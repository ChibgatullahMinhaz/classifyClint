import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Users, Clock } from "lucide-react";

const PopularClassesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const classes = [
    {
      id: 1,
      title: "Full Stack Web Development",
      instructor: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop&crop=center",
      price: 99,
      description:
        "Learn to build modern web applications with React, Node.js, and MongoDB.",
      enrollment: 1250,
      rating: 4.9,
      duration: "12 weeks",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      instructor: "Mike Chen",
      image:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop&crop=center",
      price: 79,
      description:
        "Master SEO, social media marketing, and digital advertising strategies.",
      enrollment: 980,
      rating: 4.8,
      duration: "8 weeks",
      category: "Marketing",
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop&crop=center",
      price: 129,
      description:
        "Introduction to ML algorithms, Python programming, and data analysis.",
      enrollment: 756,
      rating: 4.9,
      duration: "10 weeks",
      category: "Data Science",
    },
    {
      id: 4,
      title: "UI/UX Design Bootcamp",
      instructor: "Alex Thompson",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center",
      price: 89,
      description:
        "Design beautiful and user-friendly interfaces using modern design principles.",
      enrollment: 890,
      rating: 4.7,
      duration: "6 weeks",
      category: "Design",
    },
    {
      id: 5,
      title: "Mobile App Development",
      instructor: "David Park",
      image:
        "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop&crop=center",
      price: 109,
      description: "Build native mobile apps for iOS and Android using React Native.",
      enrollment: 672,
      rating: 4.8,
      duration: "14 weeks",
      category: "Mobile Development",
    },
    {
      id: 6,
      title: "Cybersecurity Essentials",
      instructor: "Lisa Wang",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop&crop=center",
      price: 119,
      description:
        "Learn to protect systems and networks from cyber threats and attacks.",
      enrollment: 534,
      rating: 4.9,
      duration: "9 weeks",
      category: "Security",
    },
  ];

  const itemsToShow = 3;
  const maxIndex = Math.max(0, classes.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleClasses = classes.slice(currentIndex, currentIndex + itemsToShow);

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
              {Math.min(currentIndex + itemsToShow, classes.length)} of {classes.length} courses
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
                    by <span className="font-medium">{classItem.instructor}</span>
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
