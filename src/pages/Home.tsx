import React from 'react';
import Timer from '../components/Timer';

interface TimerProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
  darkMode: boolean;
}
const Home: React.FC<TimerProps> = ({ workTime, shortBreakTime, longBreakTime, mode, setMode, darkMode }) => {
  return (
    <div>
      <Timer
        workTime={workTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        mode={mode}
        setMode={setMode}
        darkMode={darkMode} />
    </div>
  );
};

export default Home;
