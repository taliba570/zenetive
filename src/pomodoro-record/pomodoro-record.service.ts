import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PomodoroRecord } from './pomodoro-record.entity';
import { PomodoroSettings } from '../settings/pomodoro-setting.entity';
import { CreatePomodoroRecordDto, UpdatePomodoroRecordDto } from './dtos/create-pomodoro-record.dto';
import { PomodoroSettingsService } from '../settings/pomodoro-settings.service';
import { DateRangeDto } from './dtos/date-range.dto';
import { Task } from 'src/tasks/task.entity';

@Injectable()
export class PomodoroRecordService {
  constructor(
    @InjectModel(PomodoroRecord.name) private readonly pomodoroRecordModel: Model<PomodoroRecord>,
    @InjectModel(PomodoroSettings.name) private readonly pomodoroSettingsModel: Model<PomodoroSettings>,
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly pomodoroSettingsService: PomodoroSettingsService
  ) {}

  async saveRecord(createPomodoroRecordDto: CreatePomodoroRecordDto, userId: string) {
    const { endTime, startTime, taskId, wasCompleted, duration } = createPomodoroRecordDto;
    
    const pomodoroRecord = new this.pomodoroRecordModel({
      userId,
      taskId,
      startTime,
      endTime,
      duration: duration,
      wasCompleted,
    });
    await pomodoroRecord.save();

    return pomodoroRecord;
  }

  async getUserRecords(userId: string): Promise<PomodoroRecord[]> {
    return this.pomodoroRecordModel.find({ userId }).exec();
  }

  async updateRecord(recordId: string, userId: string, updateData: UpdatePomodoroRecordDto): Promise<PomodoroRecord> {
    const pomodoroRecord = await this.pomodoroRecordModel.findOneAndUpdate({ 
      _id: recordId, 
      userId 
    }, 
    updateData, 
    { new: true });
    if (!pomodoroRecord) {
      throw new NotFoundException('Pomodoro record not found');
    }

    const { startTime, endTime } = pomodoroRecord;
    const durationInMilliseconds = new Date(endTime).getTime() - new Date(startTime).getTime();
    const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60)); // Convert milliseconds to minutes

    if (pomodoroRecord.taskId) {
      const task = await this.taskModel.findById(pomodoroRecord.taskId);
      if (!task) {
        throw new NotFoundException('Task not found');
      }

      task.actualPomodoroSessions += 1;
      task.totalTimeSpent += durationInMinutes;
      task.duration += durationInMinutes;
      task.linkedPomodoroSessions.push(pomodoroRecord._id as Types.ObjectId);
      await task.save();
    }

    await this.pomodoroSettingsModel.updateOne(
      { userId },
      { $inc: { totalFocusedHours: durationInMinutes } },
      { upsert: true }
    );
  
  
    return pomodoroRecord;
  }

  async deletePomodoroRecord(recordId: string, userId: string): Promise<void> {
    const pomodoroRecord = await this.pomodoroRecordModel.findOneAndDelete({ _id: recordId, userId });

    if (!pomodoroRecord) {
      throw new NotFoundException('Pomodoro record not found');
    }

    const sessionDurationInHours = pomodoroRecord.duration;
    await this.pomodoroSettingsService.subtractFocusedHours(userId, sessionDurationInHours);
  }

  async getPomodoroSessionsCountByDay(userId: string, dateRangeDto: DateRangeDto) {
    const { startDate, endDate } = dateRangeDto;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const pomodoroRecords = await this.pomodoroRecordModel.aggregate([
      {
        $match: {
          userId,
          startTime: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$startTime' },
            month: { $month: '$startTime' },
            year: { $year: '$startTime' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    return pomodoroRecords.map(record => ({
      date: `${record._id.year}-${String(record._id.month).padStart(2, '0')}-${String(record._id.day).padStart(2, '0')}`,
      sessionCount: record.count
    }));
  }
}
