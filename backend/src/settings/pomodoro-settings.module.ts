import { Module } from '@nestjs/common';
import { PomodoroSettingsService } from './pomodoro-settings.service';
import { PomodoroSettingsController } from './pomodoro-settings.controller';
import {
  PomodoroSettings,
  PomodoroSettingsSchema,
} from './pomodoro-setting.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PomodoroSettings.name, schema: PomodoroSettingsSchema },
    ]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [PomodoroSettingsService],
  controllers: [PomodoroSettingsController],
  exports: [PomodoroSettingsService],
})
export class PomodoroSettingsModule {}
