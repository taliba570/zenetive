import React from 'react';
import Timer from '../components/Timer';

interface TimerProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
  soundNotification: boolean;
}
const Home: React.FC<TimerProps> = ({ workTime, shortBreakTime, longBreakTime, mode, setMode, soundNotification }) => {
  return (
    <div>
      <Timer
        workTime={workTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        mode={mode}
        setMode={setMode}
        soundNotification={soundNotification} />
    </div>
  );
};

export default Home;
