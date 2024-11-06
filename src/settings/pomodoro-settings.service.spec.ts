import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroSettingsService } from './pomodoro-settings.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PomodoroSettingsService', () => {
  let service: PomodoroSettingsService;

  const mockPomodoroSettingModel = {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    updateOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PomodoroSettingsService,
        {
          provide: getModelToken('PomodoroSettings'),
          useValue: mockPomodoroSettingModel
        }
      ],
    }).compile();

    service = module.get<PomodoroSettingsService>(PomodoroSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
