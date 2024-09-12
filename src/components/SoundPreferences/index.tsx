import React, { useEffect, useState } from 'react';
import { SoundSettings } from '../../interfaces/ISoundSettings';
import SoundControl from '../SoundControl';

const soundsList = {
  waves: { enabled: false, volume: 0 },
  fire: { enabled: false, volume: 0 },
  birds: { enabled: false, volume: 0 },
  coffeeshop: { enabled: false, volume: 0 },
  crickets: { enabled: false, volume: 0 },
  heavyrain: { enabled: false, volume: 0 },
  singingbowl: { enabled: false, volume: 0 },
  thunderstorm: { enabled: false, volume: 0 },
  train: { enabled: false, volume: 0 },
  whitenoise: { enabled: false, volume: 0 },
  wind: { enabled: false, volume: 0 },
};

const SoundPreferences: React.FC = () => {
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(soundsList);

  const handleVolumeChange = (sound: string, volume: string) => {
    setSoundSettings((prevSettings: any) => ({
      ...prevSettings,
      [sound]: { ...prevSettings[sound], volume }
    }));
  };

  const toggleSound = (sound: string) => {
    setSoundSettings((prevSettings: any) => ({
      ...prevSettings,
      [sound]: { ...prevSettings[sound], enabled: !prevSettings[sound].enabled }
    }));
  };

  useEffect(() => {
    localStorage.setItem('soundSettings', JSON.stringify(soundSettings));
  }, [soundSettings]);

  return (
    <>
      <div className="sound-preferences">
        <h2>Sound Preferences</h2>
        {Object.keys(soundSettings).map((sound) => (
          <SoundControl 
            soundSettings={soundSettings} 
            sound={sound} 
            toggleSound={toggleSound}
            handleVolumeChange={handleVolumeChange}
          />
        ))}
      </div>
    </>
  );
};

export default SoundPreferences;