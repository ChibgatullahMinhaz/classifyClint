import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Service/AxiosSecure";

const FeedbackSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch classes
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedbacks");
      return res.data;
    },
  });
  // Dynamically calculate itemsToShow based on window width
  const [itemsToShow, setItemsToShow] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 1;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsToShow(3);
      else if (window.innerWidth >= 768) setItemsToShow(2);
      else setItemsToShow(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, feedbacks.length - itemsToShow);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  };

  const visibleFeedbacks = feedbacks.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  // Raw Button component JSX
  const Button = ({
    children,
    onClick,
    disabled,
    variant = "default",
    size = "md",
    className = "",
    ...props
  }) => {
    let baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    if (variant === "outline") {
      baseClasses +=
        " border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700";
    } else {
      baseClasses += " bg-primary text-white hover:bg-primary-dark";
    }

    if (size === "sm") {
      baseClasses += " px-3 py-1.5 text-sm";
    } else if (size === "lg") {
      baseClasses += " px-6 py-3 text-lg";
    } else {
      baseClasses += " px-4 py-2";
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  // Raw Card & CardContent component JSX wrappers
  const Card = ({ children, className = "", ...props }) => {
    return (
      <div
        className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };

  const CardContent = ({ children, className = "", ...props }) => {
    return (
      <div className={`p-6 ${className}`} {...props}>
        {children}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real feedback from students who have transformed their careers with
            our courses
          </p>
        </div>

        {/* Feedback Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex shadow-elegant"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex shadow-elegant"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Feedback Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-12">
            {visibleFeedbacks.map((feedback) => (
              <Card
                key={feedback._id}
                className="bg-card/80 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>

                  {/* Feedback Text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{feedback.description}"
                  </p>
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < feedback.rating
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {/* Student Info */}
                  <div className="flex items-center">
                    <img
                      src={feedback.image}
                      alt={feedback.userName}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {feedback.userName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feedback.classTitle}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center space-x-4 mt-8 lg:hidden">
            <Button variant="outline" size="sm" onClick={prevSlide}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
