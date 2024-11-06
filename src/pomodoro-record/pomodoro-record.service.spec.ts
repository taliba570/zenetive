import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroRecordService } from './pomodoro-record.service';
import { PomodoroRecord } from './pomodoro-record.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from '../tasks/task.entity';
import { PomodoroSettingsService } from '../settings/pomodoro-settings.service';
import { PomodoroSettings } from '../settings/pomodoro-setting.entity';

describe('PomodoroRecordService', () => {
  let service: PomodoroRecordService;

  const mockPomodoroRecordModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  const mockPomodoroSettingsModel = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    exec: jest.fn(),
  };

  const mockTaskModel = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  const mockPomodoroSettingsService = {
    subtractFocusedHours: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PomodoroRecordService,
        {
          provide: getModelToken(PomodoroRecord.name),
          useValue: mockPomodoroRecordModel
        },
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel
        },
        {
          provide: getModelToken(PomodoroSettings.name),
          useValue: mockPomodoroSettingsModel
        },
        {
          provide: PomodoroSettingsService,
          useValue: mockPomodoroSettingsService
        }
      ],
    }).compile();

    service = module.get<PomodoroRecordService>(PomodoroRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
