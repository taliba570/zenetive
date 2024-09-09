import React from 'react';
import { timeToSeconds, timeToMinutes } from './../utils/formatTime';

interface SettingsProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  onWorkTimeChange: (time: number) => void;
  onShortBreakTimeChange: (time: number) => void;
  onLongBreakTimeChange: (time: number) => void;
}

const Settings: React.FC<SettingsProps> = ({
  workTime,
  shortBreakTime,
  longBreakTime,
  onWorkTimeChange,
  onShortBreakTimeChange,
  onLongBreakTimeChange,
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
    <div>
      <div>
        <label>Work Time (minutes)</label>
        <input 
          type="number"
          value={timeToMinutes(workTime)}
          onChange={(e) => handleWorkTimeChange(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Short Break Time (minutes)</label>
        <input 
          type="number"
          value={timeToMinutes(shortBreakTime)}
          onChange={(e) => handleShortBreakTimeChange(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Long Break Time (minutes)</label>
        <input 
          type="number"
          value={timeToMinutes(longBreakTime)}
          onChange={(e) => handleLongBreakTimeChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Settings;
