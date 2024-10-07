import React, { useState } from 'react';
import '../styles/Settings.css';
import PomodoroSettings from '../components/PomodoroSettings';
import SoundPreferences from '../components/SoundPreferences';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

interface SettingsProps {
  soundNotification: boolean;
  handleSoundNotificationChange: () => void;
}

const Settings: React.FC<SettingsProps> = ({
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
        soundNotification={soundNotification}
        handleSoundNotificationChange={handleSoundNotificationChange}
      />}
      {activeTab === 'sound' && <SoundPreferences />}
      
    </>
  );
};

export default Settings;
