import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroRecordController } from './pomodoro-record.controller';
import { PomodoroRecordService } from './pomodoro-record.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('PomodoroRecordController', () => {
  let controller: PomodoroRecordController;
  let service: PomodoroRecordService;

  const mockPomodoroRecordService = {
    saveRecord: jest.fn(),
    getUserRecords: jest.fn(),
    updateRecord: jest.fn(),
    deletePomodoroRecord: jest.fn(),
    getPomodoroSessionsCountByDay: jest.fn(),
    pausePomodoro: jest.fn(),
    resumePomodoro: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PomodoroRecordController],
      providers: [
        {
          provide: PomodoroRecordService,
          useValue: mockPomodoroRecordService
        }
      ]
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({canActivate: jest.fn(() => true)})
    .compile();

    controller = module.get<PomodoroRecordController>(PomodoroRecordController);
    service = module.get<PomodoroRecordService>(PomodoroRecordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
