import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  create(taskData: Partial<Task>): Promise<Task> {
    const newTask = new this.taskModel(taskData);
    return newTask.save();
  }
}
