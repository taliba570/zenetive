import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './task.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Label, LabelSchema } from '../labels/label.entity';
import {
  PomodoroRecord,
  PomodoroRecordSchema,
} from '../pomodoro-record/pomodoro-record.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Label.name, schema: LabelSchema },
      { name: PomodoroRecord.name, schema: PomodoroRecordSchema },
    ]),
    AuthModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
