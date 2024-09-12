export interface SoundSetting {
  icon: any;
  enabled: boolean;
  volume: number;
}

export interface SoundSettings {
  [key: string]: SoundSetting;
}