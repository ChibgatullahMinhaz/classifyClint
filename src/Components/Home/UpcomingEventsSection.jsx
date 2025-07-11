import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const events = [
  {
    id: 1,
    title: "AI in Education Summit 2025",
    image:
      "https://images.unsplash.com/photo-1596495578065-9c8a511a77e5?w=800&h=400&fit=crop",
    location: "San Francisco, USA",
  },
  {
    id: 2,
    title: "Remote Learning Best Practices",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e8f9f7d7ec6?w=800&h=400&fit=crop",
    location: "Online Event",
  },
  {
    id: 3,
    title: "Tech in Classrooms Conference",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=400&fit=crop",
    location: "London, UK",
  },
  {
    id: 4,
    title: "Innovative Teaching Workshop",
    image:
      "https://images.unsplash.com/photo-1581092334513-01063c3f3d52?w=800&h=400&fit=crop",
    location: "Toronto, Canada",
  },
  {
    id: 5,
    title: "Future of Learning Expo",
    image:
      "https://images.unsplash.com/photo-1603570419988-8b8b9ef97d06?w=800&h=400&fit=crop",
    location: "Berlin, Germany",
  },
];

const UpcomingEventsCarousel = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            Upcoming Education Events
          </h2>
          <p className="text-muted-foreground mt-2">
            Discover inspiring educational events around the world.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col justify-between flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {event.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{event.location}</span>
                    <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingEventsCarousel;
