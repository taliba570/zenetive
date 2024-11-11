import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PomodoroSettings } from './pomodoro-setting.entity';

@Injectable()
export class PomodoroSettingsService {
  constructor(
    @InjectModel(PomodoroSettings.name)
    private pomodoroSettingsModel: Model<PomodoroSettings>,
  ) {}

  async getSettings(userId: string): Promise<PomodoroSettings> {
    const settings = await this.pomodoroSettingsModel
      .findOne({ userId })
      .exec();
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }

    return settings;
  }

  async updateSettings(
    userId: string,
    updateData: Partial<PomodoroSettings>,
  ): Promise<PomodoroSettings> {
    const settings = await this.pomodoroSettingsModel
      .findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true, upsert: true },
      )
      .exec();

    return settings;
  }

  async resetSettings(userId: string): Promise<PomodoroSettings> {
    const defaultSettings = {
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      dailyPomodoroTarget: 8,
      cyclesBeforeLoginBreak: 4,
      totalFocusedHours: 0,
      soundSettings: {},
    };
    const settings = await this.pomodoroSettingsModel
      .findOneAndUpdate({ userId }, { $set: defaultSettings }, { new: true })
      .exec();

    return settings;
  }

  async subtractFocusedHours(userId: string, hours: number): Promise<void> {
    await this.pomodoroSettingsModel.updateOne(
      { userId },
      { $inc: { totalFocusedHours: -hours } },
    );
  }
}
