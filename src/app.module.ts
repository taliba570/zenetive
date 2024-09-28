import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LabelsModule } from './labels/labels.module';
import { PomodoroRecordModule } from './pomodoro-record/pomodoro-record.module';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';
import configuration from './config/configuration';
import { TasksModule } from './tasks/tasks.module';
import { PomodoroSettingsModule } from './settings/pomodoro-settings.module';
import { TimerModule } from './timer/timer.module';

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
    PomodoroRecordModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

function getEnvFilePath(): string | string[] {
  const nodeEnv = process.env.NODE_ENV || 'development';
  switch(nodeEnv) {
    case 'production':
      return '.env.production';
    case 'development':
    default:
      return '.env.development';
  }
}