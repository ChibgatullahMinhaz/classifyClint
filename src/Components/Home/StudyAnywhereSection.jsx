import { useState } from "react";
import { X, Play } from "lucide-react";

const StudyAnywhereSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 bg-blue-100 text-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
            Study whenever you want, <br /> from any place in the world.
          </h2>
          <p className="text-lg text-blue-500">
            Learn at your own pace with access to world-class resources and expert instructors.
          </p>
        </div>

        {/* Right: Video trigger */}
        <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Video Thumbnail"
            className="rounded-xl shadow-lg object-cover w-full h-64"
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center group-hover:bg-black/60 transition">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="relative w-full max-w-3xl">
            <button
              className="absolute top-4 right-4 text-white z-10"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
            <div className="w-full h-[300px]">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Study Anytime Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudyAnywhereSection;
