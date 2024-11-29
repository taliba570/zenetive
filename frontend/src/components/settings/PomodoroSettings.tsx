import { faBell, faBellSlash, faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { timeToMinutes, timeToSeconds } from '../../utils/formatTime';
import './../../styles/PomodoroSettings.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { updateLongBreakDuration, updateShortBreakDuration, updateWorkDuration } from '../../redux/slices/asyncThunks/timerThunks';

interface PomodoroSettingsProps {
  soundNotification: boolean;
  handleSoundNotificationChange: () => void;
}

const PomodoroSettings: React.FC<PomodoroSettingsProps> = ({
  soundNotification,
  handleSoundNotificationChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const timerState = useSelector((state: RootState) => state.timer);
  const { 
    workDuration, 
    shortBreakDuration, 
    longBreakDuration 
  } = timerState;
  const handleWorkTimeChange = (time: number) => {
    const durationInSeconds = timeToSeconds(time);
    dispatch(updateWorkDuration(durationInSeconds));
  };

  const handleShortBreakTimeChange = (time: number) => {
    const durationInSeconds = timeToSeconds(time);
    dispatch(updateShortBreakDuration(durationInSeconds));
  };

  const handleLongBreakTimeChange = (time: number) => {
    const durationInSeconds = timeToSeconds(time);
    dispatch(updateLongBreakDuration(durationInSeconds));
  };
  return (
    <div className="flex flex-col settings items-center justify-center min-h-screen xxs:px-10 overflow-hidden bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className='settings-content flex flex-col w-2/4 justify-center items-center'>
          <img src="https://pomodoros.s3.eu-north-1.amazonaws.com/logo.png" alt="Logo" className='w-64 logo' />
          <h1 className="text-3xl font-bold mb-6"><span><FontAwesomeIcon icon={faGears} className='pr-1' /></span>Settings</h1>
          
          <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Work Time (minutes)</label>
              <input 
                type="number"
                value={timeToMinutes(workDuration)}
                onChange={(e) => handleWorkTimeChange(Number(e.target.value))}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Short Break Time (minutes)</label>
              <input 
                type="number"
                value={timeToMinutes(shortBreakDuration)}
                onChange={(e) => handleShortBreakTimeChange(Number(e.target.value))}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Long Break Time (minutes)</label>
              <input 
                type="number"
                value={timeToMinutes(longBreakDuration)}
                onChange={(e) => handleLongBreakTimeChange(Number(e.target.value))}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-row">
              <div className="flex flex-grow">
                <span className='text-lg font-medium text-gray-900 dark:text-gray-200'>Sound Notification</span>
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
                      <FontAwesomeIcon icon={faBellSlash} className='mx-1 text-gray-300 text-2xl' />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PomodoroSettings;