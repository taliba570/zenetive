import { FC, SVGProps } from "react";
import FireIcon from './icon-components/FireIcon';
import WaveIcon from './icon-components/WaveIcon';
import WindIcon from './icon-components/WindIcon';
import WhiteNoiseIcon from './icon-components/WhiteNoiseIcon';
import TrainIcon from './icon-components/TrainIcon';
import SingingBowlIcon from './icon-components/SingingBowlIcon';
import ThunderStormIcon from './icon-components/ThunderStormIcon';
import HeavyRainIcon from './icon-components/HeavyRainIcon';
import CricketsIcon from './icon-components/CricketsIcon';
import CoffeeShopIcon from './icon-components/CoffeeShopIcon';
import BirdsIcon from './icon-components/BirdsIcon';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | null;

/*
 * Task
*/
export interface Task {
  _id: string;
  name: string;
  duration: number;
  isCompleted: boolean;
  priority?: TaskPriority;
  labels?: Label[];
}

export interface CreateTaskDto {
  name: string;
  duration: number;
  isCompleted: boolean;
  priority?: TaskPriority;
  labels?: Label[];
}

/*
 * Label
*/
export interface Label {
  _id: string;
  name?: string;
  color?: string;
  userId?: string;
  createdAt?: string;
}

export interface CreateLabelDto {
  name: string;
  color: string;
}

/*
 * Sound Settings
*/
export interface SoundSetting {
  icon: any;
  enabled: boolean;
  volume: number;
}

export interface SoundSettings {
  [key: string]: SoundSetting;
}

export interface SoundContextType {
  playEnabledSounds: (soundPreferences: SoundSettings) => void;
  stopAllSounds: () => void;
}

export type IconMap = {
  [key: string]: FC<SVGProps<SVGSVGElement>>;
};


export const soundsList = {
  waves: { enabled: false, volume: 0, icon: "WaveIcon" },
  fire: { enabled: false, volume: 0, icon: "FireIcon" },
  birds: { enabled: false, volume: 0, icon: "BirdsIcon" },
  coffeeshop: { enabled: false, volume: 0, icon: "CoffeeShopIcon" },
  crickets: { enabled: false, volume: 0, icon: "CricketsIcon" },
  heavyrain: { enabled: false, volume: 0, icon: "HeavyRainIcon" },
  singingbowl: { enabled: false, volume: 0, icon: "SingingBowlIcon" },
  thunderstorm: { enabled: false, volume: 0, icon: "ThunderStormIcon" },
  train: { enabled: false, volume: 0, icon: "TrainIcon" },
  whitenoise: { enabled: false, volume: 0, icon: "WhiteNoiseIcon" },
  wind: { enabled: false, volume: 0, icon: "WindIcon" },
};

export const iconMap: IconMap = {
  "WaveIcon": WaveIcon,
  "FireIcon": FireIcon,
  "BirdsIcon": BirdsIcon,
  "CoffeeShopIcon": CoffeeShopIcon,
  "CricketsIcon": CricketsIcon,
  "HeavyRainIcon": HeavyRainIcon,
  "SingingBowlIcon": SingingBowlIcon,
  "ThunderStormIcon": ThunderStormIcon,
  "TrainIcon": TrainIcon,
  "WhiteNoiseIcon": WhiteNoiseIcon,
  "WindIcon": WindIcon,
};