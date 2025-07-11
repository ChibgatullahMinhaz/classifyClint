import React from "react";

const NewsletterSection = () => {
  return (
    <section className="max-w-6xl my-10  mx-auto py-10 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Subscribe to our Newsletter for Newest Course Updates
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Get the latest news, course releases, and special offers delivered straight to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-6 py-3 rounded-xl border border-gray-900  focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
