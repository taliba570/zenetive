import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PomodoroSettingsModule } from './settings/pomodoro-settings.module';
import { TimerModule } from './timer/timer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LabelsModule } from './labels/labels.module';
import { PomodoroRecordModule } from './pomodoro-record/pomodoro-record.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pomodoro_db'),
    TasksModule, 
    PomodoroSettingsModule, 
    UserModule,
    TimerModule,
    AuthModule,
    LabelsModule,
    PomodoroRecordModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
