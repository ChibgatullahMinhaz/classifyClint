import React from 'react';

const Achievement = () => {
    return (
         <div className="max-w-5xl mx-auto mt-16 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Trusted by Leading Companies Worldwide
          </h3>
          <p className="text-lg text-white/90 mb-6">
            Our graduates work at top tech companies and startups across the globe
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="text-shadow-fuchsia-200 text-white font-semibold">Google</div>
            <div className="text-shadow-fuchsia-200 text-white font-semibold">Microsoft</div>
            <div className="text-shadow-fuchsia-200 text-white font-semibold">Amazon</div>
            <div className="text-shadow-fuchsia-200 text-white font-semibold">Apple</div>
            <div className="text-shadow-fuchsia-200 text-white font-semibold">Meta</div>
            <div className="text-shadow-fuchsia-200 text-white font-semibold">Netflix</div>
          </div>
        </div>
    );
};

export default Achievement;