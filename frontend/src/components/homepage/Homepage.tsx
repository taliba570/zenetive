import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="container items-center justify-center w-full flex h-screen m-auto bg-red-900 p-2 text-white">
            <div className="header w-4/6 flex h-[70px] bg-blue-500 justify-between items-center">
                <div className="logo flex justify-center items-center hover:cursor-pointer pl-5">
                    <img src='/images/logo.png' width={'50px'} className='pr-1' alt='logo' />
                    <span className='text-2xl'>Zenetive</span>
                </div>
                <div className="navbar flex ">
                    <ul className='flex'>
                        <li className="my-2 mx-1 px-4 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:border-2 hover:px-6 transition-all duration-200 ease-in-out font-semibold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">Home</li>
                        <li className="my-2 mx-1 px-4 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:border-2 hover:px-6 transition-all duration-200 ease-in-out font-semibold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">Features</li>
                        <li className="my-2 mx-1 px-4 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:border-2 hover:px-6 transition-all duration-200 ease-in-out font-semibold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">Pricing</li>
                        <li className="my-2 mx-1 px-4 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:border-2 hover:px-6 transition-all duration-200 ease-in-out font-semibold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">Contact</li>
                    </ul>
                </div>
                <div className="cta">
                    <ul className='flex'>
                        <li className='m-1 px-4 py-2 bg-purple-800 flex hover:bg-purple-300 hover:cursor-pointer rounded-2xl items-center justify-center'>Login</li>
                        <li className='m-1 px-4 py-2 bg-purple-800 flex hover:bg-purple-300 hover:cursor-pointer rounded-2xl items-center justify-center'>Signup</li>
                    </ul>
                </div>
            </div>
            <div className="mobile-header"></div>
            <div className="main">
                <div className="hero-section"></div>
                <div className="main-section"></div>
                <div className="cta-1"></div>
                <div className="features"></div>
                <div className="newsletter"></div>
                <div className="audience"></div>
                <div className="cta-2"></div>
                <div className="bottom-hero"></div>
            </div>
            <div className="footer">
                <div className="footer-section-1"></div>
                <div className="footer-section-2"></div>
                <div className="footer-section-3"></div>
            </div>
        </div>
    );
}

export default HomePage;