import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0",
    title: "Empower Your Learning Journey",
    subtitle: "Explore thousands of expert-led courses online.",
    buttonText: "Get Started",
  },
  {
    image:
      "https://images.unsplash.com/photo-1623076189461-f7706b741c04?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0",
    title: "Learn From Anywhere",
    subtitle: "Access your classes anytime, anywhere in the world.",
    buttonText: "Browse Courses",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661767552224-ef72bb6b671f?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0",
    title: "Join a Global Community",
    subtitle: "Connect with peers and mentors across the globe.",
    buttonText: "Join Now",
  },
];

const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      className="rounded-lg p-4"
    >
      {banners.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-64 md:h-96">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent rounded-lg" />

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
              <p className="text-base md:text-lg text-white/90">{slide.subtitle}</p>
              <button className="mt-2 w-fit px-5 py-2 rounded-md bg-primary hover:bg-primary/90 transition text-white font-medium">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
