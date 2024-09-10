import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faRedo, 
  faClock, 
  faCoffee, 
  faBook 
} from '@fortawesome/free-solid-svg-icons';
import focusStartSound from '../assets/sounds/startClickSound.mp3';
import pomodoroEndSound from '../assets/sounds/pomodoroEndSound.mp3';
import breakStartSound from '../assets/sounds/breakStart.mp3';
import breakEndSound from '../assets/sounds/breakEnd.mp3';
import { debounce } from '../utils/debouce';

interface TimerProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
}

const Timer: React.FC<TimerProps> = ({ workTime, shortBreakTime, longBreakTime, mode, setMode }) => {
  const [seconds, setSeconds] = useState<number>(workTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const focusStartAudio = new Audio(focusStartSound);
  const pomodoroEndSoundAudio = new Audio(pomodoroEndSound);
  const breakStartAudio = new Audio(breakStartSound);
  const breakEndAudio = new Audio(breakEndSound);

  const deboucePlay = debounce((audio: HTMLAudioElement) => {
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    })
  }, 200);

  useEffect(() => {
    if (mode === 'work') {
      setSeconds(workTime);
    } else if (mode === 'shortBreak') {
      setSeconds(shortBreakTime);
    } else if (mode === 'longBreak') {
      setSeconds(longBreakTime);
    }
  }, [mode, workTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    let interval: any;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
        console.log(seconds);
      }, 1000);
    } else if (seconds === 0) {
      if (mode === 'work') deboucePlay(pomodoroEndSoundAudio);
      else if (mode === 'longBreak' || mode === 'shortBreak') deboucePlay(breakEndAudio);
      clearInterval(interval);
      // alert(`${mode === 'work' ? 'Work' : 'Break'} session ended!`);
      setIsActive(false);
      setSeconds(workTime);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, mode]);

  useEffect(() => {
    const preloadAudio = () => {
      new Audio(focusStartSound).load();
      new Audio(pomodoroEndSound).load();
      new Audio(breakStartSound).load();
      new Audio(breakEndSound).load();
    }
    preloadAudio();
  }, []);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive && mode === 'work') deboucePlay(focusStartAudio);
    else if (!isActive && (mode === 'shortBreak' || mode === 'longBreak')) deboucePlay(breakStartAudio);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') setSeconds(workTime);
    else if (mode === 'shortBreak') setSeconds(shortBreakTime);
    else setSeconds(longBreakTime);
  };

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    if (isActive && seconds > 0) {
      
    }
    setIsActive(false);
    setMode(newMode);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
      <div className="text-6xl mb-4">
        {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}{seconds % 60}
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={toggleTimer}
          className={`px-4 py-2 rounded-lg font-medium transition duration-300 transform active:scale-95 text-white 
            ${
              isActive
                ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 active:bg-yellow-700'
                : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 active:bg-blue-700'
            }
          `}
        >
          <FontAwesomeIcon icon={isActive ? faPause : faPlay} className="mr-2" />
          {isActive ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={resetTimer}
          className="px-4 py-2 rounded-lg font-medium transition duration-300 transform active:scale-95 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:from-red-500 hover:to-red-700 active:bg-red-700"
        >
          <FontAwesomeIcon icon={faRedo} className="mr-2" />
          Reset
        </button>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => switchMode('work')}
          className={`px-4 py-2 rounded-lg font-medium transition duration-300 transform active:scale-95 text-white 
            ${
              mode === 'work'
                ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 active:bg-green-700 shadow-xl shadow-green-500/60'
                : 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700'
            }
          `}
        >
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          Work
        </button>

        <button
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-2 rounded-lg font-medium transition duration-300 transform active:scale-95 text-white 
            ${
              mode === 'shortBreak'
                ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 active:bg-purple-700 shadow-xl shadow-purple-500/60'
                : 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:from-purple-500 hover:to-purple-700'
            }
          `}
        >
          <FontAwesomeIcon icon={faCoffee} className="mr-2" />
          Short Break
        </button>

        <button
          onClick={() => switchMode('longBreak')}
          className={`px-4 py-2 rounded-lg font-medium transition duration-300 transform active:scale-95 text-white 
            ${
              mode === 'longBreak'
                ? 'bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 active:bg-pink-700 shadow-xl shadow-pink-500/60'
                : 'bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:from-pink-500 hover:to-pink-700'
            }
          `}
        >
          <FontAwesomeIcon icon={faBook} className="mr-2" />
          Long Break
        </button>
      </div>

    </div>
  );
};

export default Timer;
