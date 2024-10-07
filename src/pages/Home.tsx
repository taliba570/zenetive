import React from 'react';
import Timer from '../components/Timer';

interface TimerProps {
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
  soundNotification: boolean;
}
const Home: React.FC<TimerProps> = ({ mode, setMode, soundNotification }) => {
  return (
    <div>
      <Timer
        mode={mode}
        setMode={setMode}
        soundNotification={soundNotification} />
    </div>
  );
};

export default Home;
