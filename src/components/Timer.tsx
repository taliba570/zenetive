import React, { useEffect, useState } from 'react';

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
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      alert(`${mode === 'work' ? 'Work' : 'Break'} session ended!`);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') setSeconds(workTime);
    else if (mode === 'shortBreak') setSeconds(shortBreakTime);
    else setSeconds(longBreakTime);
  };

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setIsActive(false);
    setMode(newMode);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-6xl mb-4">
        {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}{seconds % 60}
      </div>
      <div className="space-x-4">
        <button
          onClick={toggleTimer}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
        >
          Reset
        </button>
      </div>
      <div>
        <button onClick={() => switchMode('work')}>Work</button>
        <button onClick={() => switchMode('shortBreak')}>Short Break</button>
        <button onClick={() => switchMode('longBreak')}>Long Break</button>
      </div>
    </div>
  );
};

export default Timer;
