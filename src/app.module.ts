import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { SettingsModule } from './settings/settings.module';
import { TimerModule } from './timer/timer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pomodoro_db'),
    TasksModule, 
    SettingsModule, 
    UserModule,
    TimerModule,
    AuthModule
  ],
})
export class AppModule {}
