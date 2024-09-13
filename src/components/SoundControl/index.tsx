import React, { useState } from 'react';
import { SoundSettings } from '../../interfaces/ISoundSettings';
import './SoundControl.css'; // Make sure to create this CSS file
import PropTypes from 'prop-types';
import Switch from '../Switch/Switch';
import Toast from '../Toast/Toast';

interface SoundControlProps {
  soundSettings: SoundSettings;
  sound: string;
  IconComponent: any;
  toggleSound: (soundName: string) => void;
  handleVolumeChange: (soundName: string, volume: number) => void;
}

const SoundControl: React.FC<SoundControlProps> = ({
  soundSettings,
  sound,
  IconComponent,
  toggleSound,
  handleVolumeChange
}) => {
  const soundEnabled = soundSettings[sound]?.enabled;
  const soundVolume = soundSettings[sound]?.volume || 0;
  const [checkEnabled, setCheckEnabled] = useState(false);

  const handleSliderClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!soundEnabled) {
      setCheckEnabled(true);
    }
    return false;
  };

  return (
    <div className="sound-control">
      {/* Icon */}
      <div className="icon">
        <IconComponent
          className={`w-24 h-24 ${soundEnabled ? 'text-blue-500 dark:text-blue-500' : 'text-gray-700 dark:text-gray-100'} transition-colors duration-300`}
        />
      </div>

      {/* Sound Control */}
      <div className="sound-setting pt-3">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={soundVolume} 
          onChange={(e) => {
            if (!soundEnabled) {
              return false;
            }
            handleVolumeChange(sound, parseInt(e.target.value))
          }}
          onClick={handleSliderClick} // Trigger toast if sound is not enabled
          className={`volume-slider ${!soundEnabled ? 'disabled-slider' : ''}`}
        />
        <div className='pt-2'>
          <Switch isChecked={soundEnabled} onChange={() => toggleSound(sound)} showIcon={false} />
        </div>
      </div>

      {/* Toast Notification */}
      {checkEnabled && (
        <Toast message='Enable the sound first to adjust its volume!' type='info' onClose={() => setCheckEnabled(false)} />
      )}
    </div>
  );
};

SoundControl.propTypes = {
  soundSettings: PropTypes.objectOf(
    PropTypes.shape({
      enabled: PropTypes.bool.isRequired,
      volume: PropTypes.number.isRequired,
      icon: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  sound: PropTypes.string.isRequired,
  IconComponent: PropTypes.func.isRequired, // For passing a React component as a prop
  toggleSound: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
};

export default SoundControl;
