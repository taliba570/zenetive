import React, { useEffect, useState } from 'react';
import SoundControl from './SoundControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { SoundSettings, soundsList } from '../../utils/types';
import { editSoundPreference, fetchSoundPreferences } from '../../services/apis/SoundPreferences';
import { getIconComponent } from '../../utils/helper';

const SoundPreferences: React.FC = () => {
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(soundsList);
  
  useEffect(() => {
    const loadSoundPreferences = async () => {
      try {
        const lSSoundPreference = localStorage.getItem('soundSettings');
        if (lSSoundPreference) {
          const parsedSettings = JSON.parse(lSSoundPreference);
          setSoundSettings(parsedSettings);
          return;
        }
        const settings = await fetchSoundPreferences();
        const mergedSettings: SoundSettings = { ...soundsList };
        settings.sounds.forEach((pref: any) => {
          if (mergedSettings[pref.url]) {
            mergedSettings[pref.url] = {
              ...mergedSettings[pref.url],
              enabled: true,
              volume: pref.volume
            };
          }
        });
        setSoundSettings(mergedSettings);
        localStorage.setItem('soundSettings', JSON.stringify(mergedSettings));
      } catch (error) {
        console.error('Error fetching sound preferences:', error);
      }
    };
    loadSoundPreferences();
  }, []);

  const handleVolumeChange = async (sound: string, volume: number) => {
    setSoundSettings((prevSettings: any) => ({
      ...prevSettings,
      [sound]: { ...prevSettings[sound], volume }
    }));
    const updatedSettings = Object.entries(soundSettings)
      .filter(([_, sound]) => sound.enabled) // Filter only enabled sounds
      .map(([url, sound]) => ({
        url, // Set the key as the 'url'
        volume: sound.volume,
        icon: sound.icon,
    }));
    try {
      localStorage.setItem('soundSettings', JSON.stringify(soundSettings));
      await editSoundPreference(updatedSettings);
    } catch (error) {
      console.error('Error toggling sound:', error);
    }
  };

  const toggleSound = async (sound: string) => {
    setSoundSettings((prevSettings: any) => {
      const result: SoundSettings = {
        ...prevSettings,
        [sound]: { ...prevSettings[sound], enabled: !prevSettings[sound].enabled, volume: (!prevSettings[sound].enabled === true) ? 50 : 0 }
      };
      const updatedSettings = Object.fromEntries(
        Object.entries(result).filter(([_, sound]) => sound.enabled)
      );
      
      try {
        localStorage.setItem('soundSettings', JSON.stringify(result));
        editSoundPreference(updatedSettings);
      } catch (error) {
        console.error('Error toggling sound:', error);
      }
      return result;
    });
  };

  return (
    <>
      <div className="flex flex-col pt-10 sound-preferences items-center justify-center min-h-screen xxs:px-10 overflow-hidden bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <img src="https://pomodoros.s3.eu-north-1.amazonaws.com/logo.png" alt="Logo" className='w-64 logo' />
        <div className='flex'>
          <h1 className="flex mx-auto text-3xl font-bold mb-6 dark:text-white"><span><FontAwesomeIcon icon={faHeadphones} className='pr-2' /></span>Sound Preferences</h1>
        </div>
        <div className="container m-auto flex flex-wrap justify-center mt-1 gap-14">
          {Object.keys(soundSettings).map((sound) => (
            <SoundControl 
              key={sound}
              soundSettings={soundSettings} 
              sound={sound}
              IconComponent={getIconComponent(soundSettings[sound]?.icon)}
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