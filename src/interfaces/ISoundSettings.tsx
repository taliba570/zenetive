export interface SoundSetting {
  enabled: boolean;
  volume: number;
}

export interface SoundSettings {
  [key: string]: SoundSetting;
}