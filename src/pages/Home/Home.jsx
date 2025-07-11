import React from 'react';
import Banner from '../../Components/Banner/Banner';
import PartnersSection from '../../Components/Home/PartnersSection';
import PopularClassesSection from '../../Components/Home/PopularClassesSection';

const Home = () => {
    return (
        <>
            <Banner />
            <PartnersSection />
            <PopularClassesSection />
        </>
    );
};

export default Home;