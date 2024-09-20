import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PomodoroRecord } from './pomodoro-record.schema';
import { PomodoroSettings } from '../settings/pomodoro-setting.entity';
import { CreatePomodoroRecordDto } from './dtos/create-pomodoro-record.dto';
import { PomodoroSettingsService } from '../settings/pomodoro-settings.service';
import { DateRangeDto } from './dtos/date-range.dto';

@Injectable()
export class PomodoroRecordService {
  constructor(
    @InjectModel(PomodoroRecord.name) private readonly pomodoroRecordModel: Model<PomodoroRecord>,
    @InjectModel(PomodoroSettings.name) private readonly pomodoroSettingsModel: Model<PomodoroSettings>,
    private readonly pomodoroSettingsService: PomodoroSettingsService
  ) {}

  async saveRecord(createPomodoroRecordDto: CreatePomodoroRecordDto, userId: string) {
    const { endTime, startTime, taskId, wasCompleted } = createPomodoroRecordDto;
    const durationInMinutes = ((new Date(endTime)).getTime() - (new Date(startTime)).getTime()) / 60000;
    const durationInHours = durationInMinutes;
    console.log(durationInHours, userId);

    const pomodoroRecord = new this.pomodoroRecordModel({
      userId,
      taskId,
      startTime,
      endTime,
      duration: durationInMinutes,
      wasCompleted,
    });
    await pomodoroRecord.save();

    await this.pomodoroSettingsModel.updateOne(
      { userId },
      { $inc: { totalFocusedHours: durationInHours } },
      { upsert: true }
    );

    return pomodoroRecord;
  }

  async getUserRecords(userId: string): Promise<PomodoroRecord[]> {
    return this.pomodoroRecordModel.find({ userId }).exec();
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
