import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
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
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: [configuration],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required().uri(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().default('30d'),
        API_PORT: Joi.number().default(3000),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    TasksModule, 
    PomodoroSettingsModule, 
    UserModule,
    TimerModule,
    AuthModule,
    LabelsModule,
    PomodoroRecordModule,
    SoundPreferenceModule
  ],
  providers: [
    CustomLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}

function getEnvFilePath(): string | string[] {
  const nodeEnv = process.env.NODE_ENV || 'production';
  switch(nodeEnv) {
    case 'production':
      return '.env.production';
    case 'development':
    default:
      return '.env.development';
  }
}