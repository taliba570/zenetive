import React, { useState } from 'react';
import { timeToSeconds, timeToMinutes } from '../../utils/formatTime';
import './Settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash, faGears } from '@fortawesome/free-solid-svg-icons';

interface SettingsProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  onWorkTimeChange: (time: number) => void;
  onShortBreakTimeChange: (time: number) => void;
  onLongBreakTimeChange: (time: number) => void;
  soundNotification: boolean;
  handleSoundNotificationChange: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  workTime,
  shortBreakTime,
  longBreakTime,
  onWorkTimeChange,
  onShortBreakTimeChange,
  onLongBreakTimeChange,
  soundNotification,
  handleSoundNotificationChange
}) => {

  const handleWorkTimeChange = (time: number) => {
    onWorkTimeChange(timeToSeconds(time)); // Store time in seconds
  };

  const handleShortBreakTimeChange = (time: number) => {
    onShortBreakTimeChange(timeToSeconds(time));
  };

  const handleLongBreakTimeChange = (time: number) => {
    onLongBreakTimeChange(timeToSeconds(time));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <img src="/images/logo.png" alt="Logo" className='w-64 logo' />
      <h1 className="text-3xl font-bold mb-6"><span><FontAwesomeIcon icon={faGears} className='pr-1' /></span>Settings</h1>
      
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Work Time (minutes)</label>
          <input 
            type="number"
            value={timeToMinutes(workTime)}
            onChange={(e) => handleWorkTimeChange(Number(e.target.value))}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Short Break Time (minutes)</label>
          <input 
            type="number"
            value={timeToMinutes(shortBreakTime)}
            onChange={(e) => handleShortBreakTimeChange(Number(e.target.value))}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Long Break Time (minutes)</label>
          <input 
            type="number"
            value={timeToMinutes(longBreakTime)}
            onChange={(e) => handleLongBreakTimeChange(Number(e.target.value))}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-row">
          <div className="flex flex-grow">
            <span className='text-xl text-gray-200 font-semibold'>Sound Notification</span>
          </div>
          <div className='flex'>
            <label className='switch'>
              <input type="checkbox" checked={soundNotification} onChange={handleSoundNotificationChange} />
              <span className='slider'></span>
              
            </label>
            <div className='pt-1'>
              {
                soundNotification ? 
                  <FontAwesomeIcon icon={faBell} className='mx-2 text-2xl' /> : 
                  <FontAwesomeIcon icon={faBellSlash} className='mx-1 text-2xl' />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
