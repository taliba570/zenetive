import { faChartArea, faClock, faList12 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { chartData } from '../../chartData';
import { tasks } from '../../tasks';
import { StopWatch } from '../StopWatch/StopWatch';
import TaskItem from '../tasks/TaskItem';

const Features = () => {
    return (
        <div className="main-section p-4">
            <div className="p-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="bentoCard col-span-4 row-span-12 p-6 rounded-lg shadow-lg flex flex-col items-start">
                        <div className="tracker tr-1"></div>
                        <div className="tracker tr-2"></div>
                        <div className="tracker tr-3"></div>
                        <div className="tracker tr-4"></div>
                        <div className="tracker tr-5"></div>
                        <div className="tracker tr-6"></div>
                        <div className="tracker tr-7"></div>
                        <div className="tracker tr-8"></div>
                        <div className="tracker tr-9"></div>
                        <div className="tracker tr-10"></div>
                        <div className="tracker tr-11"></div>
                        <div className="tracker tr-12"></div>
                        <div className="tracker tr-13"></div>
                        <div className="tracker tr-14"></div>
                        <div className="tracker tr-15"></div>
                        <div className="tracker tr-16"></div>
                        <div className="tracker tr-17"></div>
                        <div className="tracker tr-18"></div>
                        <div className="tracker tr-19"></div>
                        <div className="tracker tr-20"></div>
                        <div className="tracker tr-21"></div>
                        <div className="tracker tr-22"></div>
                        <div className="tracker tr-23"></div>
                        <div className="tracker tr-24"></div>
                        <div className="tracker tr-25"></div>
                        <h2 className="text-2xl text-white openSans-Bold mb-4">To-Do List</h2>
                        <p className="text-purple-100 openSans-SemiBold mb-4">Use a pre-designed template or personalize with video, stickers, fonts, and more.</p>
                        <div className="flex-1 flex items-center w-full m-0 p-0">
                            <ul className="space-y-4 w-full">
                                {tasks.map((task: any) => (
                                    <TaskItem 
                                        onToggleComplete={() => {}}
                                        onEdit={() => {}}
                                        onDelete={() => {}}
                                        key={task.name}
                                        task={task}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bentoCard col-span-8 row-span-8 p-6 rounded-lg shadow-lg flex flex-col items-start">
                        <h2 className="text-2xl font-bold openSans-Bold text-white mb-4">AI-Driven Reports</h2>
                        <div className="text-orange-100 openSans-SemiBold mb-4">Schedule all your cards and gifts now, and we'll send them later.</div>
                        <div className=''>
                            <AreaChart width={900} height={250} data={chartData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
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
                                <XAxis label={{ value: 'Days', position: 'insideBottom', dy: 20, style: {  fill: 'white' } }} 
                                        tick={{ fill: 'white' }}  color='#fff' dataKey="name"/>
                                <YAxis label={{ value: 'Hours', angle: -90, dx: -10, position: 'outsideLeft', 
                                    style: { fill: 'white' } }} tick={{ fill: 'white' }}  />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="Last Week" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                <Area type="monotone" dataKey="This Week" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                            </AreaChart>
                        </div>
                    </div>

                    <div className="bentoCard col-span-4 row-span-4 p-6 rounded-lg shadow-lg flex flex-col items-start">
                        <h2 className="text-2xl openSans-Bold text-white mb-4">Pomodoro Timer</h2>
                        <p className="text-green-100 openSans-SemiBold mb-4">Access all your gifts and save up your Gifting Cash.</p>
                        <div className="flex-1 flex items-center w-full m-0 p-0">
                            <StopWatch />
                        </div>
                    </div>

                    <div className="bentoCard col-span-4 row-span-12 p-6 rounded-lg shadow-lg flex flex-col items-start">
                        <h2 className="text-2xl openSans-Bold text-white mb-4">Customizable User Profiles</h2>
                        <p className="text-green-100 openSans-SemiBold mb-4">Track your gifts, group chats, and sent cards.</p>
                        <div className="glassContainer justify-center items-center h-full">
                            <div data-text="Github" className="glass">
                                <img src="/images/user-profile.png" className='w-full'/>
                            </div>
                            <div data-text="Code" className="glass">
                                <img src="/images/user-profile-2.png"className='w-full' />
                            </div>
                        </div>

                    </div>

                    <div className="bentoCard col-span-8 row-span-8 p-6 rounded-lg shadow-lg flex flex-col items-start">
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
    );
}
export default Features;