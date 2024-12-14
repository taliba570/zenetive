import React from 'react';
import { StopWatch } from '../StopWatch/StopWatch';
import { tasks } from '../../tasks';
import TaskItem from '../tasks/TaskItem';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { chartData } from '../../chartData';
import "../../styles/Homepage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faClock, faList12 } from '@fortawesome/free-solid-svg-icons';

const HomePage: React.FC = () => {
    return (
        <div className="container w-full mx-auto flex flex-col items-center justify-start text-white">
            {/* Header */}
            <div className="header flex h-[70px] justify-between items-center gap-32">
                <div className="logo flex justify-center items-center hover:cursor-pointer pl-5 mt-10">
                    <span className='bg-gradient-to-b rotate-90 from-[#fb57b9] to-[#8f52fc] transition-all duration-500 ease-in-out hover:rotate-180 rounded-3xl w-10 h-10 mr-1'></span>
                    <div className="text-description flex flex-col">
                        <span className='text-white text-[2rem] openSans-SemiBold leading-5'>Zenetive</span>
                        <span className='text-white text-[12.5px] openSans-SemiBold tracking-wide underline'>productive everyday!</span>
                    </div>
                </div>
                <div className="navbar flex mt-10">
                    <ul className='flex h-[56px] openSans-SemiBold'>
                        <li className="text-md text-white mx-3 py-4 px-6 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:border-red-300 hover:translate-y-[-6px] hover:shadow-custom transition-all duration-300 ease-in-out font-bold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">
                            Home
                        </li>
                        <li className="text-md text-white mx-3 py-4 px-6 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:border-red-300 hover:translate-y-[-6px] hover:shadow-custom transition-all duration-300 ease-in-out font-bold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">
                            Features
                        </li>
                        <li className="text-md text-white mx-3 py-4 px-6 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:border-red-300 hover:translate-y-[-6px] hover:shadow-custom transition-all duration-300 ease-in-out font-bold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">
                            Pricing
                        </li>
                        <li className="text-md text-white mx-3 py-4 px-6 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:border-red-300 hover:translate-y-[-6px] hover:shadow-custom transition-all duration-300 ease-in-out font-bold drop-shadow-md flex hover:cursor-pointer rounded-2xl items-center justify-center tracking-wider">
                            Contact
                        </li>
                    </ul>
                </div>
                <div className="cta mt-10">
                    <ul className='flex border-1 p-[2px] rounded-2xl border-2 h-[56px] openSans-SemiBold'>
                        <li className='mr-[2px] px-4 py-2 hover:bg-gray-100 text-white hover:text-black transition-all duration-300 ease-in-out flex hover:cursor-pointer rounded-xl items-center justify-center'>Login</li>
                        <li className='px-4 py-2 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] hover:from-[#bc8cf1] hover:to-[#a386f8] flex hover:cursor-pointer rounded-xl items-center justify-center transition-all duration-500 ease-in-out'>Signup</li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="main w-full">
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
                <div className="main-section p-4">
                <div className="p-6">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="bg-[linear-gradient(45deg,#7f00ff,#e100ff)] col-span-4 row-span-12 p-6 rounded-lg shadow-lg flex flex-col items-start">
                            <h2 className="text-2xl text-white openSans-Bold mb-4">To-Do List</h2>
                            <p className="text-purple-100 openSans-SemiBold mb-4">Use a pre-designed template or personalize with video, stickers, fonts, and more.</p>
                            <div className="flex-1 flex items-center w-full m-0 p-0">
                                <ul className="space-y-4 w-full">
                                    {tasks.map((task: any) => (
                                        <TaskItem 
                                        onToggleComplete={() => {}}
                                        onEdit={() => {}}
                                        onDelete={() => {}}
                                        key={task._id}
                                        task={task}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-[linear-gradient(130deg,#fc4a1a,#f7b733)] col-span-8 row-span-8 p-6 rounded-lg shadow-lg flex flex-col items-start">
                            <h2 className="text-2xl font-bold openSans-Bold text-white mb-4">AI-Driven Reports</h2>
                            <p className="text-orange-100 openSans-SemiBold mb-4">Schedule all your cards and gifts now, and we'll send them later.</p>
                            <div className=''>
                                <AreaChart width={900} height={250} data={chartData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7f00ff" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#7f00ff" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#e100ff" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#e100ff" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name"/>
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Last Week" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="This Week" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                            </div>
                        </div>

                        <div className="bg-[linear-gradient(130deg,#FF416C,#ff6Bbb)] col-span-4 row-span-4 p-6 rounded-lg shadow-lg flex flex-col items-start">
                            <h2 className="text-2xl openSans-Bold text-white mb-4">Pomodoro Timer</h2>
                            <p className="text-green-100 openSans-SemiBold mb-4">Access all your gifts and save up your Gifting Cash.</p>
                            <div className="flex-1 flex items-center w-full m-0 p-0">
                                <StopWatch />
                            </div>
                        </div>

                        <div className="bg-[linear-gradient(130deg,#00bfd6,#a8ff78)] col-span-4 row-span-12 p-6 rounded-lg shadow-lg flex flex-col items-start">
                            <h2 className="text-2xl openSans-Bold text-white mb-4">Customizable User Profiles</h2>
                            <p className="text-green-100 openSans-SemiBold mb-4">Track your gifts, group chats, and sent cards.</p>
                            <img src="/images/path-to-image5.png" alt="Inbox" className="rounded-lg w-full object-cover" />
                        </div>

                        <div className="bg-[linear-gradient(130deg,#ff5e62,#ff9966)] col-span-8 row-span-8 p-6 rounded-lg shadow-lg flex flex-col items-start">
                            <h2 className="text-2xl openSans-Bold text-white mb-4">Basic Will Alway Be Free</h2>
                            <p className="text-orange-100 mb-4">Send as a group with friends or individually.</p>
                            <div className="glassContainer">
                                <div data-text="To-Do List" className="glass">
                                    <FontAwesomeIcon icon={faList12}/>
                                </div>
                                <div data-text="Pomodoro Timer"  className="glass">
                                    <FontAwesomeIcon icon={faClock}/>
                                </div>
                                <div data-text="Reports"  className="glass">
                                    <FontAwesomeIcon icon={faChartArea}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>

                </div>
                <div className="cta-1"></div>
                <div className="features"></div>
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