import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LabelsModule } from './labels/labels.module';
import { PomodoroRecordModule } from './pomodoro-record/pomodoro-record.module';
import { TasksModule } from './tasks/tasks.module';
import { PomodoroSettingsModule } from './settings/pomodoro-settings.module';
import { TimerModule } from './timer/timer.module';
import { SoundPreferenceModule } from './sound-preference/sound-preference.module';
import { CustomLogger } from './logger/custom-logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { CorsMiddleware } from './commons/middlewares/cors.middleware';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';
import dbConfig from './config/db.config';
import { configOptions } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(dbConfig.asProvider()),
    TasksModule,
    PomodoroSettingsModule,
    UserModule,
    TimerModule,
    AuthModule,
    LabelsModule,
    PomodoroRecordModule,
    SoundPreferenceModule,
  ],
  providers: [
    CustomLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}