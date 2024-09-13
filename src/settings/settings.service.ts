import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private settingsModel: Model<Settings>,
  ) {}

  async getSoundPreference(userId: number) {
    const settings = await this.settingsModel.findOne({ userId });
    return settings ? settings.soundPreferences : null;
  }

  async updateSoundPreferences(userId: number, newPreferences: any) {
    let settings = await this.settingsModel.findOne({ userId });
    if (!settings) {
      settings = new this.settingsModel({ userId, soundPreferences: newPreferences });
    } else {
      settings.soundPreferences = { ...settings.soundPreferences, ...newPreferences };
    }
    return settings.save();
  }
}
