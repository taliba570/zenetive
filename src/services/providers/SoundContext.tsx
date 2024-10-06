import React, { createContext, useContext, useRef } from "react";
import { SoundContextType } from "../../types";

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: any) => {
  const audioInstances = useRef<HTMLAudioElement[]>([]);

  const playEnabledSounds = (soundPreference: any) => {
    Object.keys(soundPreference).forEach((soundType) => {
      const sound = soundPreference[soundType];
      if (sound.enabled) {
        const audio = new Audio(`https://pomodoros.s3.eu-north-1.amazonaws.com/${soundType}.mp3`);
        audio.volume = sound.volume / 100;
        audio.play();
        audioInstances.current.push(audio);

        return () => {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });
  };

  const stopAllSounds = () => {
    audioInstances.current.forEach((audio: any) => {
      audio.pause();
      audio.currentTime = 0;
    });
    audioInstances.current = [];
  };

  return (
    <SoundContext.Provider value={{ playEnabledSounds, stopAllSounds }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used withing a SoundProvider');
  }
  return context;
};