import React from 'react';
import { SoundSettings, SoundSetting } from '../../interfaces/ISoundSettings';

interface SoundControlProps {
  soundSettings: SoundSettings;
  sound: string;
  toggleSound: (soundName: string) => void;
  handleVolumeChange: (soundName: string, volume: string) => void;
}

const SoundControl: React.FC<SoundControlProps> = ({
  soundSettings,
  sound,
  toggleSound,
  handleVolumeChange
}) => {
  return (
    <div className="sound-setting p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-between">
      <label className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          checked={soundSettings[sound].enabled} 
          onChange={() => toggleSound(sound)} 
          className="form-checkbox text-blue-500"
        />
        <span className="text-lg font-semibold">
          {sound.charAt(0).toUpperCase() + sound.slice(1)}
        </span>
      </label>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={soundSettings[sound].volume} 
        onChange={(e) => handleVolumeChange(sound, e.target.value)}
        disabled={!soundSettings[sound].enabled}
        className="range-slider w-32 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
      />
    </div>
  );
};

export default SoundControl;