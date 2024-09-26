import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PomodoroSettingsModule } from './settings/pomodoro-settings.module';
import { TimerModule } from './timer/timer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LabelsModule } from './labels/labels.module';
import { PomodoroRecordModule } from './pomodoro-record/pomodoro-record.module';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';
import { CorsMiddleware } from './commons/middlewares/cors.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
    consumer
      .apply(CorsMiddleware)
      .forRoutes('*');
  }
}
