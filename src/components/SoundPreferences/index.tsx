import React, { useEffect, useState } from 'react';
import { SoundSettings } from '../../interfaces/ISoundSettings';
import SoundControl from '../SoundControl';
import FireIcon from '../../icon-components/FireIcon';
import WaveIcon from '../../icon-components/WaveIcon';
import WindIcon from '../../icon-components/WindIcon';
import WhiteNoiseIcon from '../../icon-components/WhiteNoiseIcon';
import TrainIcon from '../../icon-components/TrainIcon';
import SingingBowlIcon from '../../icon-components/SingingBowlIcon';
import ThunderStormIcon from '../../icon-components/ThunderStormIcon';
import HeavyRainIcon from '../../icon-components/HeavyRainIcon';
import CricketsIcon from '../../icon-components/CricketsIcon';
import CoffeeShopIcon from '../../icon-components/CoffeeShopIcon';
import BirdsIcon from '../../icon-components/BirdsIcon';

const soundsList = {
  waves: { enabled: false, volume: 0, icon: WaveIcon },
  fire: { enabled: false, volume: 0, icon: FireIcon },
  birds: { enabled: false, volume: 0, icon: BirdsIcon },
  coffeeshop: { enabled: false, volume: 0, icon: CoffeeShopIcon },
  crickets: { enabled: false, volume: 0, icon: CricketsIcon },
  heavyrain: { enabled: false, volume: 0, icon: HeavyRainIcon },
  singingbowl: { enabled: false, volume: 0, icon: SingingBowlIcon },
  thunderstorm: { enabled: false, volume: 0, icon: ThunderStormIcon },
  train: { enabled: false, volume: 0, icon: TrainIcon },
  whitenoise: { enabled: false, volume: 0, icon: WhiteNoiseIcon },
  wind: { enabled: false, volume: 0, icon: WindIcon },
};

const SoundPreferences: React.FC = () => {
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(soundsList);

  const handleVolumeChange = (sound: string, volume: number) => {
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
      <div className="min-h-screen sound-preferences dark:bg-gray-800">
        <h2>Sound Preferences</h2>
        <div className="container m-auto flex flex-wrap justify-center gap-14 pt-10">
          {Object.keys(soundSettings).map((sound) => (
            <SoundControl 
              soundSettings={soundSettings} 
              sound={sound}
              IconComponent={soundSettings[sound].icon}
              toggleSound={toggleSound}
              handleVolumeChange={handleVolumeChange}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SoundPreferences;