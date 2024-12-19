import React from 'react';
import "../../styles/Homepage.css";
import Features from './Features';
import HomepageHeader from './Header';
import Hero from './Hero';
import Whyus from './Whyus';
import NewsLetter from './Newsletter';

const HomePage: React.FC = () => {
    return (
        <div className="container w-full mx-auto flex flex-col items-center justify-start text-white">
            {/* Header */}
            <HomepageHeader />

            {/* Main Content */}
            <div className="main w-full">
                <Hero />
                <Features />
                <Whyus />
                <div className="cta-1">
                    <NewsLetter />
                </div>
                <div className="newsletter"></div>
                <div className="audience"></div>
                <div className="cta-2"></div>
                <div className="bottom-hero"></div>
            </div>

            {/* Footer */}
            <div className="footer w-full flex justify-around p-4">
                <div className="footer-section-1"></div>
                <div className="footer-section-2"></div>
                <div className="footer-section-3"></div>
            </div>
        </div>
    );
}

export default HomePage;