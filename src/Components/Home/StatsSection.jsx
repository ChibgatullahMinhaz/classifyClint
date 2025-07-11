import { Users, BookOpen, UserCheck, TrendingUp } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      title: "Total Users",
      value: "50,000+",
      description: "Active learners on our platform",
      color: "text-blue-500",
    },
    {
      icon: BookOpen,
      title: "Total Classes",
      value: "1,200+",
      description: "Courses across various categories",
      color: "text-green-500",
    },
    {
      icon: UserCheck,
      title: "Total Enrollments",
      value: "125,000+",
      description: "Students enrolled in our courses",
      color: "text-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Success Rate",
      value: "94%",
      description: "Students achieving their goals",
      color: "text-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-card hover:shadow-glow transition-all duration-300 border border-border hover:border-primary/20 group rounded-2xl"
                >
                  <div className="p-8 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-10 h-10 p-2 rounded-lg text-white bg-[#185BDF]" />
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {stat.value}
                    </h3>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {stat.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{stat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image and Content */}
          <div className="space-y-8">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students learning together"
                className="w-full h-80 object-cover rounded-2xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Be part of a thriving educational ecosystem where students from around the
                world come together to learn, grow, and achieve their career goals. Our
                platform has helped thousands of individuals transform their lives through
                quality education.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">
                    Expert-led courses with real-world applications
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">
                    24/7 community support and mentorship
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">
                    Career guidance and job placement assistance
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Lifetime access to course materials</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Banner */}
       
      </div>
    </section>
  );
};

export default StatsSection;
