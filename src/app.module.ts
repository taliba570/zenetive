import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SettingsModule } from './settings/settings.module';
import { TimerModule } from './timer/timer.module';

@Module({
  imports: [TasksModule, SettingsModule, TimerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
