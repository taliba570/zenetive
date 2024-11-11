import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroRecordController } from './pomodoro-record.controller';
import { PomodoroRecordService } from './pomodoro-record.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePomodoroRecordDto } from './dtos/create-pomodoro-record.dto';
import { Types } from 'mongoose';

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
          useValue: mockPomodoroRecordService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PomodoroRecordController>(PomodoroRecordController);
    service = module.get<PomodoroRecordService>(PomodoroRecordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('create pomodoro record using service.saveRecord with correct params and return the result', async () => {
      const createPomodoroRecordDto: CreatePomodoroRecordDto = {
        expectedDuration: 25,
        taskId: new Types.ObjectId('614d9f2332f0a1b5c4c2a645'),
        startTime: 1729604939963,
        expectedEndTime: 1729604939977,
      };

      const mockUserId = '123456';
      const mockUser = { user: { userId: mockUserId } };
      const expectedResult = { id: 1, ...createPomodoroRecordDto };

      mockPomodoroRecordService.saveRecord.mockResolvedValue(expectedResult);

      const result = await controller.saveRecord(
        createPomodoroRecordDto,
        mockUser,
      );

      expect(service.saveRecord).toHaveBeenCalledWith(
        createPomodoroRecordDto,
        mockUserId,
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
