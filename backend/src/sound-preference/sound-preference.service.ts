import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSoundPreferenceDto } from './dto/update-sound-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoundPreference } from './entities/sound-setting.entity';
import { Model } from 'mongoose';

@Injectable()
export class SoundPreferenceService {
  constructor(
    @InjectModel(SoundPreference.name)
    private readonly soundPrefereceModel: Model<SoundPreference>,
  ) {}

  async update(
    userId: string,
    updateData: UpdateSoundPreferenceDto,
  ): Promise<SoundPreference> {
    console.log(updateData, 'service'); // Log to see the structure of updateData
    const settings = await this.soundPrefereceModel
      .findOneAndUpdate(
        { userId },
        { $set: { sounds: updateData } },
        { new: true, upsert: true },
      )
      .exec();
    return settings;
  }

  async get(userId: number) {
    const settings = await this.soundPrefereceModel.findOne({ userId }).exec();
    if (!settings) {
      throw new NotFoundException('Sound preference not found');
    }

    return settings;
  }
}
