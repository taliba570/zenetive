import { Module } from '@nestjs/common';
import { PomodoroRecordController } from './pomodoro-record.controller';
import { PomodoroRecordService } from './pomodoro-record.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PomodoroRecord, PomodoroRecordSchema } from './pomodoro-record.entity';
import { PomodoroSettingsModule } from '../settings/pomodoro-settings.module';
import { PomodoroSettings, PomodoroSettingsSchema } from '../settings/pomodoro-setting.entity';
import { Task, TaskSchema } from '../tasks/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PomodoroRecord.name, schema: PomodoroRecordSchema },
      { name: PomodoroSettings.name, schema: PomodoroSettingsSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    PomodoroSettingsModule,
  ],
  controllers: [PomodoroRecordController],
  providers: [PomodoroRecordService],
  exports: [PomodoroRecordService],
})
export class PomodoroRecordModule {}
