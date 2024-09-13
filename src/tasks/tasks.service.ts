import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  create(taskData: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(taskData);
    return newTask.save();
  }
}
