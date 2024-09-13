import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { SettingsModule } from './settings/settings.module';
import { TimerModule } from './timer/timer.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pomodoro_db'),
    TasksModule, 
    SettingsModule, 
    TimerModule
  ],
})
export class AppModule {}
