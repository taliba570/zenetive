import { Module } from '@nestjs/common';
import { PomodoroRecordController } from './pomodoro-record.controller';
import { PomodoroRecordService } from './pomodoro-record.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PomodoroRecord, PomodoroRecordSchema } from './pomodoro-record.schema';
import { PomodoroSettingsModule } from '../settings/pomodoro-settings.module';
import { PomodoroSettings, PomodoroSettingsSchema } from '../settings/pomodoro-setting.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PomodoroRecord.name, schema: PomodoroRecordSchema }]),
    MongooseModule.forFeature([{ name: PomodoroSettings.name, schema: PomodoroSettingsSchema }]),
    PomodoroSettingsModule,
  ],
  controllers: [PomodoroRecordController],
  providers: [PomodoroRecordService],
})
export class PomodoroRecordModule {}
