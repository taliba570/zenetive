import React from 'react';

const HomepageHeader = () => {
    return (
        <div className="header flex h-[70px] justify-between items-center gap-32">
            <div className="logo group flex justify-center items-center hover:cursor-pointer pl-5 mt-10">
                <span className='bg-gradient-to-br from-[#4158d0] via-[#c850c0] to-[#ffcc70] transition-all duration-500 ease-in-out group-hover:rotate-180 rounded-3xl w-10 h-10 mr-1'></span>
                <div className="text-description flex flex-col">
                    <span className='text-white text-[2rem] openSans-SemiBold leading-5'>BlahBlah</span>
                    <span className='text-white text-[12.5px] openSans-SemiBold tracking-wide underline'>productive everyday!</span>
                </div>
            </div>
            <div className="navbar flex mt-10">
                <ul className='flex h-[56px] openSans-SemiBold'>
                    <li className="text-md text-white mx-3 py-4 px-6 bg-gradient-to-br from-[#4158d0] to-[#c850c0] hover:border-red-300 hover:translate-y-[-6px] hover:shadow-custom transition-all duration-300 ease-in-out font-bold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">
                        Home
                    </li>
                    <li className="text-md text-white mx-3 py-4 px-6 bg-gradient-to-br from-[#4158d0] to-[#c850c0] hover:border-red-300 hover:translate-y-[-6px] hover:shadow-custom transition-all duration-300 ease-in-out font-bold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">
                        Features
                    </li>
                    <li className="text-md text-white mx-3 py-4 px-6 bg-gradient-to-br from-[#4158d0] to-[#c850c0] hover:border-red-300 hover:translate-y-[-6px] hover:shadow-custom transition-all duration-300 ease-in-out font-bold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">
                        Pricing
                    </li>
                    <li className="text-md text-white mx-3 py-4 px-6 bg-gradient-to-br from-[#4158d0] to-[#c850c0] hover:border-red-300 hover:translate-y-[-6px] hover:shadow-custom transition-all duration-300 ease-in-out font-bold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">
                        Contact
                    </li>
                </ul>
            </div>
            <div className="cta mt-10">
                <ul className='flex border-1 p-[2px] rounded-2xl border-2 h-[56px] openSans-SemiBold'>
                    <li className='mr-[2px] px-4 py-2 hover:bg-gray-100 text-white hover:text-black transition-all duration-300 ease-in-out flex hover:cursor-pointer rounded-xl items-center justify-center'>Login</li>
                    <li className='px-4 py-2 bg-gradient-to-br from-[#4158d0] via-[#c850c0] to-[#ffcc70] hover:from-[#bc8cf1] hover:to-[#a386f8] flex hover:cursor-pointer rounded-xl items-center justify-center transition-all duration-500 ease-in-out'>Signup</li>
                </ul>
            </div>
        </div>
    );
}

export default HomepageHeader;