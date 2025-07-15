import React from "react";
import Banner from "../../Components/Banner/Banner";
import PartnersSection from "../../Components/Home/PartnersSection";
import PopularClassesSection from "../../Components/Home/PopularClassesSection";
import FeedbackSection from "../../Components/Home/FeedbackSection";
import StatsSection from "../../Components/Home/StatsSection";
import TeacherCTASection from "../../Components/Home/TeacherCTASection";
import StudyAnywhereSection from "../../Components/Home/StudyAnywhereSection";
import NewsletterSection from "../../Components/Home/NewsletterSection";
import UpcomingEventsSection from "../../Components/Home/UpcomingEventsSection";
import Achievement from "../../Components/Home/Achievement";

const Home = () => {
  return (
    <>
      <div className="p-2">
        <Banner />
      </div>
      <PartnersSection />
      <PopularClassesSection />
      <div className="p-2">
        <FeedbackSection />
      </div>
      <StatsSection />
      <TeacherCTASection />
      <StudyAnywhereSection />
      <UpcomingEventsSection />
      <div className="p-2">
        <Achievement />
        <NewsletterSection />
      </div>{" "}
    </>
  );
};

export default Home;
