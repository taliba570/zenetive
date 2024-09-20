import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './task.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Label, LabelSchema } from 'src/labels/label.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }]),
    AuthModule
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
