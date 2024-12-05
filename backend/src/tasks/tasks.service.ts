import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { AssignLabelToTask } from './dtos/assign-label-to-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  async findAll(page: number, limit: number, userId: number): Promise<any> {
    const skip = (page - 1) * limit;
    const tasks = await this.taskModel
      .find({
        userId,
        isCompleted: false,
      })
      .populate({
        path: 'labels',
        select: 'name',
      })
      .populate('linkedPomodoroSessions')
      .skip(skip)
      .limit(limit)
      .sort({ priority: -1, createdAt: -1 })
      .exec();

    const totalTasks = await this.taskModel.countDocuments({
      userId: userId,
      isCompleted: false,
    });

    return {
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
      hasNext: page < Math.ceil(totalTasks / limit),
    };
  }

  async findById(taskId: string, userId: number): Promise<Task> {
    const task = await this.taskModel
      .findOne({ _id: taskId, userId })
      .populate('linkedPomodoroSessions')
      .exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found!`);
    }
    return task;
  }

  async create(taskData: CreateTaskDto, userId: string): Promise<Task> {
    try {
      const newTask = new this.taskModel({ ...taskData, userId });
      return await newTask.save();
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Could not create task');
    }
  }

  async updateTask(taskId: string, userId: string, updateData: Partial<Task>) {
    const task = await this.taskModel.findByIdAndUpdate(
      { _id: taskId, userId: userId },
      { $set: updateData },
      { new: true },
    );

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${taskId} not found or you don't have permission to update it.`,
      );
    }

    return task;
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    const task = await this.taskModel
      .findOneAndDelete({
        _id: taskId,
        userId: userId,
      })
      .exec();

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${taskId} not found or you do not have permission to delete it.`,
      );
    }
  }

  async assignLabelsToTask(
    assignLabelsToTaskDto: AssignLabelToTask,
  ): Promise<Task> {
    const { taskId, labelIds } = assignLabelsToTaskDto;
    return this.taskModel
      .findByIdAndUpdate(
        taskId,
        { $addToSet: { labels: { $each: labelIds } } },
        { new: true },
      )
      .exec();
  }

  async removeLabelFromTask(taskId: string, labelId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
    }

    task.labels = task.labels.filter((label) => label.toString() !== labelId);
    return task.save();
  }

  async searchTasks(userId: string, query: string): Promise<Task[]> {
    const regex = new RegExp(query, 'i');

    return this.taskModel
      .find({
        userId,
        name: { $regex: regex },
        isCompleted: false,
      })
      .limit(20) // Limit results to prevent over-fetching
      .exec();
  }
}
