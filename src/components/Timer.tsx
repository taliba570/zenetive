import React, { useEffect, useRef, useState } from 'react';
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
import Modal from './Modal/Modal';
import Toast from './Toast/Toast';
import { SoundSettings } from '../interfaces/ISoundSettings';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css'; 

interface TimerProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
  soundNotification: boolean;
}

const Timer: React.FC<TimerProps> = ({ workTime, shortBreakTime, longBreakTime, mode, setMode, soundNotification }) => {
  const [seconds, setSeconds] = useState<number>(workTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [changeMode, setChangeMode] = useState<'work' | 'shortBreak' | 'longBreak' | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [resetCycleModalOpen, setResetCycleModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' } | null>(null);
  const [completedCycles, setCompletedCycles] = useState(() => {
    const savedCycles = localStorage.getItem('completedCycles');
    return savedCycles ? JSON.parse(savedCycles) : 0;
  });
  const [soundPreference, setSoundPreference] = useState<SoundSettings>(() => {
    const savedPreference = localStorage.getItem('soundSettings');
    return savedPreference ? JSON.parse(savedPreference) : {};
  });
  const audioInstances = useRef<HTMLAudioElement[]>([]);

  const focusStartAudio = new Audio(focusStartSound);
  const pomodoroEndSoundAudio = new Audio(pomodoroEndSound);
  const breakStartAudio = new Audio(breakStartSound);
  const breakEndAudio = new Audio(breakEndSound);

  const driverObj = driver({
    showProgress: true,  // Because everyone loves progress bars!
    steps: [
      {
        element: '#element-of-mystery',
        popover: {
          title: 'Abracadabra!',
          description: 'Watch as I reveal the secrets of this element.'
        }
      },
      // More magical steps...
    ]
  });

  const startTheMagicShow = () => {
    driverObj.drive();
  }

  const playEnabledSounds = () => {
    Object.keys(soundPreference).forEach((soundType) => {
      const sound = soundPreference[soundType];
      if (sound.enabled) {
        const audio = new Audio(`https://pomodoros.s3.eu-north-1.amazonaws.com/${soundType}.mp3`);
        audio.volume = sound.volume / 100;
        audio.play();
        audioInstances.current.push(audio);

        return () => {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    })
  };

  const pauseAllSounds = () => {
    audioInstances.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  const deboucePlay = debounce((audio: HTMLAudioElement) => {
    if (soundNotification) {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      })
    }
  }, 200);

  const totalTime = mode === 'work' ? workTime : mode === 'shortBreak' ? shortBreakTime : longBreakTime;

  const percentageTimeLeft = (seconds / totalTime) * 100;

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
    localStorage.setItem('completedCycles', JSON.stringify(completedCycles));
  }, [completedCycles]);

  useEffect(() => {
    let interval: any;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      if (mode === 'work') {
        deboucePlay(pomodoroEndSoundAudio);
        setCompletedCycles(() => completedCycles+1);
        pauseAllSounds();
      }
      else if (mode === 'longBreak' || mode === 'shortBreak') deboucePlay(breakEndAudio);
      clearInterval(interval);
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
    if (!isActive) {
      if (mode === 'work') {
        deboucePlay(focusStartAudio);
        playEnabledSounds();
      }
      else if (!isActive && (mode === 'shortBreak' || mode === 'longBreak')) deboucePlay(breakStartAudio);
    } else {
      pauseAllSounds();
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    pauseAllSounds();
    if (mode === 'work') setSeconds(workTime);
    else if (mode === 'shortBreak') setSeconds(shortBreakTime);
    else setSeconds(longBreakTime);
  };

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setIsActive(false);
    setMode(newMode);
    closeModal();
  };

  const openModal = (selectedMode: 'work' | 'shortBreak' | 'longBreak') => {
    setChangeMode(selectedMode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const resetPomodoroCycle = () => {
    setCompletedCycles(0);
    setResetCycleModalOpen(false);
  }

  const closeResetCycleModal = () => {
    setResetCycleModalOpen(false);
  }

  return (
    <>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 overflow-hidden">
        <div
          className="h-full shadow-lg bg-gradient-to-tr from-[#b446cf] to-[#2bc8f8] transition-width duration-1000 ease-linear"
          style={{ width: `${percentageTimeLeft}%` }}
        ></div>
      </div>

      <div onClick={() => setResetCycleModalOpen(true)} className='group flex absolute text-white text-4xl bg-gradient-to-br from-[#b446cf] to-[#2bc8f8] w-20 h-20 text-center justify-center rounded-full right-5 top-24 cursor-default'>
        <div className='flex justify-center m-auto pb-1'>
          {completedCycles}
        </div>
        <span className="group-hover:opacity-100 text-lg transition-opacity bg-gradient-to-br from-[#b446cf] to-[#2bc8f8] px-1 text-gray-100 rounded-md absolute left-1/2 
        -translate-x-1/2 translate-y-full opacity-0 m-10 mx-auto">Pomodoros Completed</span>
      </div>
      
      {/* <button onClick={startTheMagicShow}>Start Magical Tour</button>
      <div id="element-of-mystery">Your mystical content here</div> */}
      
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

        <div className="flex flex-row xxs:mx-auto xxs:items-center space-x-4 mt-4 xxs:flex-col">
          <button
            onClick={() => { if (isActive) openModal('work'); else switchMode('work') }}
            className={`px-4 py-2 xxs:mt-5 xxs:mx-auto rounded-lg font-medium transition duration-300 transform active:scale-95 text-white 
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
            onClick={() => { if (isActive) openModal('shortBreak'); else switchMode('shortBreak') }}
            className={`px-4 py-2 xxs:mt-8 xxs:mx-auto rounded-lg font-medium transition duration-300 transform active:scale-95 text-white 
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
            onClick={() => { if (isActive) openModal('longBreak'); else switchMode('longBreak') }}
            className={`px-4 py-2 xxs:mt-8 xxs:mx-auto rounded-lg font-medium transition duration-300 transform active:scale-95 text-white 
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

        {/* Modal for confirmation before switching mode */}
        {isModalOpen && (
          <Modal 
            isOpen={isModalOpen}
            title={`Switch to ${changeMode} mode`}
            message={`Are you sure you want to switch to ${changeMode} mode? This will reset the current session.`}
            iconType='warning'
            modalType='confirmation'
            onConfirm={() => {
              if (changeMode) switchMode(changeMode);
            }}
            onCancel={closeModal}
          />
        )}
        {resetCycleModalOpen && (
          <Modal 
          isOpen={resetCycleModalOpen}
          title={`Reset Today's Progress`}
          message={`Are you sure you want to reset today's progress?`}
          iconType='warning'
          modalType='confirmation'
          onConfirm={() => resetPomodoroCycle()}
          onCancel={closeResetCycleModal}
          />
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </>
  );
};

export default Timer;
