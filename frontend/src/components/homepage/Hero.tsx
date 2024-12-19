import React from 'react';

const Hero = () => {
    return (
        <div className="hero-section w-4/6 mx-auto py-10">
            <h1 className='text-white text-6xl openSans-ExtraBold text-center pt-16'>Unlock Your Full Potential</h1>
            <h2 className='text-white text-2xl w-5/6 mx-auto openSans-Regular font-bold text-center pt-4 pb-10'>Stay focused, track progress, and boost performance with personalized insights and powerful tools—all in one place.</h2>
            {/* <button className="text-lg my-2 py-4 px-14 drop-shadow-lg openSans-SemiBold bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:px-16 hover:drop-shadow-[0_15px_15px_rgba(127,0,255,0.35)] transition-all duration-200 ease-in-out font-bold flex hover:cursor-pointer rounded-xl items-center justify-center tracking-wider mx-auto">
                Join the Beta Today!
            </button> */}
            <button id="animatedButton" className='text-lg openSans-SemiBold'>
                <p>Join the Beta Today!</p>
            </button>
            <span className='text-[#b1b1b1] flex justify-center openSans-SemiBold'>No Credit Card Required</span>
        </div>
    );
}

export default Hero;