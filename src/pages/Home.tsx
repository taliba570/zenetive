import React from 'react';
import Timer from '../components/Timer';

interface TimerProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
}
const Home: React.FC<TimerProps> = ({ workTime, shortBreakTime, longBreakTime, mode, setMode }) => {
  return (
    <div>
      <Timer
        workTime={workTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        mode={mode}
        setMode={setMode} />
    </div>
  );
};

export default Home;
