import React from "react";
const partners = [
  {
    name: "OpenAI",
    logo: "https://platform.theverge.com/wp-content/uploads/sites/2/2025/02/openai-old-logo.png?quality=90&strip=all&crop=7.8125%2C0%2C84.375%2C100&w=240https://about.coursera.org/static/whiteCoursera-23ec484f7091914430ce19b07d09aedf.svg",
    description:
      "Partnered for AI-powered learning tools and intelligent tutoring systems.",
  },
  {
    name: "Coursera",
    logo: "https://about.coursera.org/static/whiteCoursera-23ec484f7091914430ce19b07d09aedf.svg",
    description:
      "Collaborating to offer high-quality courses from top universities.",
  },
  {
    name: "Khan Academy",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQic1IHTV0YD5RuETkd2BmGnS-JskPp_hPYgQ&s",
    description:
      "Providing free world-class education content for all learners.",
  },
  {
    name: "edX",
    logo: "https://images.seeklogo.com/logo-png/33/1/edx-logo-png_seeklogo-339838.png",
    description:
      "Offering access to massive open online courses from leading institutions.",
  },
];

const PartnersSection = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-3 text-blue-600">
        Our Trusted Partners
      </h2>
      <p className="text-lg text-center mb-8">
        We collaborate with industry leaders and educational institutions to
        provide the best learning experience for our students.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-center">
        {partners.map(({ name, logo, description }) => (
          <div
            key={name}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-20 mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
