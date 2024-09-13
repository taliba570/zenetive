import React, { useState } from 'react';
import './Settings.css';
import PomodoroSettings from '../../components/PomodoroSettings';
import SoundPreferences from '../../components/SoundPreferences';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

interface SettingsProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  onWorkTimeChange: (time: number) => void;
  onShortBreakTimeChange: (time: number) => void;
  onLongBreakTimeChange: (time: number) => void;
  soundNotification: boolean;
  handleSoundNotificationChange: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  workTime,
  shortBreakTime,
  longBreakTime,
  onWorkTimeChange,
  onShortBreakTimeChange,
  onLongBreakTimeChange,
  soundNotification,
  handleSoundNotificationChange
}) => {
  const [activeTab, setActiveTab] = useState('pomodoro');

  return (
    <>
      <div className="settings-container">
        <div className="tabs">
          <button 
            className={activeTab === 'pomodoro' ? 'active' : ''}
            onClick={() => setActiveTab('pomodoro')}
          >
            <FontAwesomeIcon icon={faClock} /> Pomodoro Settings
          </button>
          <button 
            className={activeTab === 'sound' ? 'active' : ''}
            onClick={() => setActiveTab('sound')}
          >
            <FontAwesomeIcon icon={faVolumeUp} /> Sound Settings
          </button>
        </div>
      </div>

      {activeTab === 'pomodoro' && 
      <PomodoroSettings
        workTime={workTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        soundNotification={soundNotification}
        handleSoundNotificationChange={handleSoundNotificationChange}
        onWorkTimeChange={onWorkTimeChange}
        onShortBreakTimeChange={onShortBreakTimeChange}
        onLongBreakTimeChange={onLongBreakTimeChange}
      />}
      {activeTab === 'sound' && <SoundPreferences />}
      
    </>
  );
};

export default Settings;
