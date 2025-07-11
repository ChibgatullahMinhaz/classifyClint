import React from 'react';
import Banner from '../../Components/Banner/Banner';
import PartnersSection from '../../Components/Home/PartnersSection';
import PopularClassesSection from '../../Components/Home/PopularClassesSection';
import FeedbackSection from '../../Components/Home/FeedbackSection';
import StatsSection from '../../Components/Home/StatsSection';

const Home = () => {
    return (
        <>
            <Banner />
            <PartnersSection />
            <PopularClassesSection />
            <FeedbackSection />
            <StatsSection />
        </>
    );
};

export default Home;