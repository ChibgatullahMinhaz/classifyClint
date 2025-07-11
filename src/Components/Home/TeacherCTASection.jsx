import { ArrowRight, DollarSign, Users, Trophy, BookOpen } from "lucide-react";

const TeacherCTASection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn While Teaching",
      description: "Set your own pricing and earn competitive revenue from your courses"
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Connect with students from around the world and build your audience"
    },
    {
      icon: Trophy,
      title: "Expert Recognition",
      description: "Establish yourself as an industry expert and thought leader"
    },
    {
      icon: BookOpen,
      title: "Teaching Support",
      description: "Get comprehensive tools and support to create amazing courses"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Share Your Knowledge.
                <span className="block text-primary">Inspire Students.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join thousands of instructors who are transforming lives through education. 
                Turn your expertise into impact and income on EduManage.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 text-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button  className="bg-gradient-to-r  from-blue-600 to-blue-800 hover:shadow-blue-400 flex items-center btn text-blue-100 transition-all duration-300">
                Start Teaching Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button  className="btn btn-primary btn-outline transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Active Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">$2.5M+</div>
                <div className="text-sm text-muted-foreground">Earned by Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">4.8★</div>
                <div className="text-sm text-muted-foreground">Avg. Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=500&fit=crop&crop=center"
                alt="Inspiring teacher with students"
                className="w-full h-96 object-cover rounded-2xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute top-8 -left-4 bg-card border border-border rounded-xl p-4 shadow-elegant">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">$15,420</div>
                  <div className="text-xs text-muted-foreground">Monthly Earnings</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 -right-4 bg-card border border-border rounded-xl p-4 shadow-elegant">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">2,847</div>
                  <div className="text-xs text-muted-foreground">Students Taught</div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-accent rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-primary rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Success Stories from Our Instructors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="text-4xl mb-4">💰</div>
              <h4 className="font-semibold text-foreground mb-2">Sarah Johnson</h4>
              <p className="text-sm text-muted-foreground">
                "I've earned over $50,000 teaching web development courses while working full-time."
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="text-4xl mb-4">🌟</div>
              <h4 className="font-semibold text-foreground mb-2">Mike Chen</h4>
              <p className="text-sm text-muted-foreground">
                "Teaching on EduManage helped me become a recognized expert in digital marketing."
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-semibold text-foreground mb-2">Dr. Emily Rodriguez</h4>
              <p className="text-sm text-muted-foreground">
                "My ML courses reached over 10,000 students worldwide in just 6 months."
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default TeacherCTASection;