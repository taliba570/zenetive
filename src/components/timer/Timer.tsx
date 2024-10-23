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
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css'; 
import focusStartSound from '../../assets/sounds/startClickSound.mp3';
import pomodoroEndSound from '../../assets/sounds/pomodoroEndSound.mp3';
import breakStartSound from '../../assets/sounds/breakStart.mp3';
import breakEndSound from '../../assets/sounds/breakEnd.mp3';
import { debounce } from '../../utils/debouce';
import Toast from '../common/Toast';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  switchMode,
  tick,
  incrementCompletedCycles,
} from '../../redux/slices/timerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useSound } from '../../services/providers/SoundContext';
import Modal from '../common/Modal';
import { setCurrentTask } from '../../redux/slices/taskSlice';
import SearchableDropdown from './SearchableDropdown';
import SelectedTaskDisplay from './SelectedTaskDisplay';
import { Task } from '../tasks/interface/Task.interface';
import { fetchTasks } from '../../redux/slices/asyncThunks.ts/taskThunks';
import { fetchPomodoroSettings } from '../../redux/slices/asyncThunks.ts/timerThunks';
import { completeSession, createPomodoroSession } from '../../redux/slices/asyncThunks.ts/pomodoroRecordThunks';

interface TimerProps {
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
  soundNotification: boolean;
}

const Timer: React.FC<TimerProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const timerState = useSelector((state: RootState) => state.timer);
  const { playEnabledSounds, stopAllSounds } = useSound();
  const { 
    mode, 
    isActive, 
    elapsedSeconds, 
    completedCycles, 
    workDuration, 
    shortBreakDuration, 
    longBreakDuration 
  } = timerState;
  const { tasks, fetched, currentTask, loading, error: tasksError } = useSelector((state: RootState) => state.tasks);

  const [changeMode, setChangeMode] = useState<'work' | 'shortBreak' | 'longBreak' | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [resetCurrentPomodoro, setResetCurrentPomodoro] = useState<boolean>(false);
  const [resetCycleModalOpen, setResetCycleModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [taskPage, setTaskPage] = useState<number>(1);

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

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(fetchTasks({ page: taskPage, limit: 10 }));
    }
  }, [fetched, dispatch, taskPage]);

  const startTheMagicShow = () => {
    driverObj.drive();
  }

  const deboucePlay = debounce((audio: HTMLAudioElement) => {
    if (true) {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      })
    }
  }, 200);

  const totalTime = mode === 'work' ? workDuration : mode === 'shortBreak' ? shortBreakDuration : longBreakDuration;

  const percentageTimeLeft = ((totalTime - elapsedSeconds) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const pomodoroSettings = localStorage.getItem('pomodoroSettings');
    if (!pomodoroSettings) {
      dispatch(fetchPomodoroSettings());
    } 
    if (isActive) {
      interval = setInterval(() => {
        console.log('Elapsed seconds:', elapsedSeconds);
        console.log('Total time:', totalTime);
        dispatch(tick());

        if (elapsedSeconds +1 >= totalTime) {
          setIsRunning(false);
          clearInterval(interval);
          dispatch(pauseTimer());
          if (mode === 'work') {
            deboucePlay(pomodoroEndSoundAudio);
            dispatch(incrementCompletedCycles());
            const duration = totalTime - elapsedSeconds;
            const completeSessionData = {
              endTime: '',
              duration: duration,
              isRunning: false,
              wasCompleted: duration === totalTime ? true : false
            };
            dispatch(completeSession(completeSessionData));
            stopAllSounds();
            if (((completedCycles+1) % 4) === 0)
              switchModeHandler('longBreak');
            else 
              switchModeHandler('shortBreak');
          } else if (mode === 'shortBreak' || mode === 'longBreak') {
            deboucePlay(breakEndAudio);
            switchModeHandler('work');
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, mode, elapsedSeconds, totalTime, dispatch, deboucePlay, pomodoroEndSoundAudio, breakEndAudio]);

  useEffect(() => {
    localStorage.setItem('completedCycles', JSON.stringify(completedCycles));
  }, [completedCycles]);

  useEffect(() => {
    const preloadAudio = () => {
      new Audio(focusStartSound).load();
      new Audio(pomodoroEndSound).load();
      new Audio(breakStartSound).load();
      new Audio(breakEndSound).load();
    }
    preloadAudio();
  }, [focusStartAudio, pomodoroEndSoundAudio, breakStartAudio, breakEndAudio]);

  const handleStart = () => {
    dispatch(startTimer(totalTime));
  };

  useEffect(() => {
    if (timerState.startTime) {

      // Once startTime is updated, create the Pomodoro session
      dispatch(createPomodoroSession({
        duration: 0,
        taskId: currentTask,
        startTime: timerState.startTime,
        endTime: null,
        isRunning: true
      }));
    }
  }, [timerState.startTime]);

  const toggleTimer = () => {
    if (!isActive) {
      handleStart();
      if (mode === 'work') {
        setIsRunning(true);
        deboucePlay(focusStartAudio);
        playEnabledSounds((() => {
          const savedPreference = localStorage.getItem('soundSettings');
          return savedPreference ? JSON.parse(savedPreference) : {};
        })());
      } else if (mode === 'shortBreak' || mode === 'longBreak') {
        deboucePlay(breakStartAudio);
      }
    } else {
      dispatch(pauseTimer());
      deboucePlay(pomodoroEndSoundAudio);
      stopAllSounds();
    }
  };

  const resetTimerHandler = () => {
    dispatch(resetTimer());
    stopAllSounds();
    closeResetCurrentPomodoroModal();
  };

  const switchModeHandler = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    dispatch(switchMode(newMode));
    closeModal();
  };

  const openModal = (selectedMode: 'work' | 'shortBreak' | 'longBreak') => {
    setChangeMode(selectedMode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeResetCurrentPomodoroModal = () => {
    setResetCurrentPomodoro(false);
  };

  const resetPomodoroCycle = () => {
    dispatch({ type: 'timer/resetCompletedCycles' })
    setResetCycleModalOpen(false);
  }

  const closeResetCycleModal = () => {
    setResetCycleModalOpen(false);
  }

  const handleTaskChange = (task: Task | null) => {
    dispatch(setCurrentTask(task));
  };

  const displaySeconds = totalTime - elapsedSeconds;
  const minutes = Math.floor(displaySeconds / 60);
  const seconds = displaySeconds % 60;

  return (
    <>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 overflow-hidden">
        <div
          className="h-full shadow-lg bg-gradient-to-tr from-[#ffb88c] to-[#ff616d] transition-width duration-1000 ease-linear"
          style={{ width: `${percentageTimeLeft}%` }}
        ></div>
      </div>

      <div onClick={() => setResetCycleModalOpen(true)} className='group flex absolute text-white text-4xl bg-gradient-to-br from-[#ffb88c] to-[#ff616d] w-20 h-20 text-center justify-center rounded-full right-5 top-24 cursor-default'>
        <div className='flex justify-center m-auto pb-1'>
          {completedCycles}
        </div>
        <span className="group-hover:opacity-100 text-lg transition-opacity bg-gradient-to-br from-[#ffb88c] to-[#ff616d] px-1 text-gray-100 rounded-md absolute left-1/2 
        -translate-x-1/2 translate-y-full opacity-0 m-10 mx-auto">Pomodoros Completed</span>
      </div>
      
      {/* <button onClick={startTheMagicShow}>Start Magical Tour</button>
      <div id="element-of-mystery">Your mystical content here</div> */}
      
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
        {!currentTask && (
          <div className="w-1/4">
            <label>Link to Task (Optional):</label>
            <SearchableDropdown
              value={currentTask}
              onChange={(task) => handleTaskChange(task)}
            />
          </div>
        )}
        
        {currentTask && <SelectedTaskDisplay />}
      
        <div className="text-6xl mb-4 text-center">
          {minutes}:{seconds < 10 ? '0' : ''}{seconds}
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
            onClick={() => (isActive) ? setResetCurrentPomodoro(true) : ''}
            className="px-4 py-2 rounded-lg font-medium transition duration-300 transform active:scale-95 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:from-red-500 hover:to-red-700 active:bg-red-700"
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2" />
            Reset
          </button>
        </div>

        <div className="flex flex-row xxs:mx-auto xxs:items-center space-x-4 mt-4 xxs:flex-col">
          <button
            onClick={() => { if (isActive) openModal('work'); else switchModeHandler('work') }}
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
            onClick={() => { if (isActive) openModal('shortBreak'); else switchModeHandler('shortBreak') }}
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
            onClick={() => { if (isActive) openModal('longBreak'); else switchModeHandler('longBreak') }}
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
              if (changeMode) switchModeHandler(changeMode);
            }}
            onCancel={closeModal}
          />
        )}
        {resetCurrentPomodoro && (
          <Modal 
            isOpen={resetCurrentPomodoro}
            title={`Reset current timer`}
            message={`Are you sure you want to reset current timer? Current progress will be lost!`}
            iconType='warning'
            modalType='confirmation'
            onConfirm={() => {
              if (resetCurrentPomodoro) resetTimerHandler();
            }}
            onCancel={closeResetCurrentPomodoroModal}
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
