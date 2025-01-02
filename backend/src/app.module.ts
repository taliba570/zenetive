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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';
import dbConfig from './config/db.config';
import { configOptions } from './config/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import redisConfig from './config/redis.config';
import { RequestSignatureGuard } from './auth/guards/request-signature.guard';
import { PasswordService } from './user/password.service';
import { JwtService } from '@nestjs/jwt';
import { CorsMiddleware } from './commons/middlewares/cors.middleware';
import { TimeHelper } from './commons/helpers/time.helper';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(dbConfig.asProvider()),
    RedisModule.forRootAsync(redisConfig.asProvider()),
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
    {
      provide: APP_GUARD,
      useClass: RequestSignatureGuard,
    },
    PasswordService,
    JwtService,
    TimeHelper,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
