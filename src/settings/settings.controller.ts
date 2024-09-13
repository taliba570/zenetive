import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('sound-preferences/:userId')
  async getSoundPreferences(@Param('userId') userId: number) {
    return this.settingsService.getSoundPreference(userId);
  }

  @Post('sound-preferences/:userId')
  async updateSoundPreferences(
    @Param('userId') userId: number,
    @Body() newPreferences: any,
  ) {
    return this.settingsService.updateSoundPreferences(userId, newPreferences);
  }
}
