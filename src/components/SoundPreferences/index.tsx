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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

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
      <div className="flex flex-col pt-10 sound-preferences items-center justify-center min-h-screen xxs:px-10 overflow-hidden bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <img src="/images/logo.png" alt="Logo" className='w-64 logo' />
        <div className='flex'>
          <h1 className="flex mx-auto text-3xl font-bold mb-6 dark:text-white"><span><FontAwesomeIcon icon={faHeadphones} className='pr-2' /></span>Sound Preferences</h1>
        </div>
        <div className="container m-auto flex flex-wrap justify-center mt-1 gap-14">
          {Object.keys(soundSettings).map((sound) => (
            <SoundControl 
              key={sound}
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