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

const Home = () => {
  return (
    <>
      <Banner />
      <PartnersSection />
      <PopularClassesSection />
      <FeedbackSection />
      <StatsSection />
      <TeacherCTASection />
      <StudyAnywhereSection />
      <UpcomingEventsSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
