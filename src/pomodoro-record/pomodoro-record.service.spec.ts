import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroRecordService } from './pomodoro-record.service';

describe('PomodoroRecordService', () => {
  let service: PomodoroRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PomodoroRecordService],
    }).compile();

    service = module.get<PomodoroRecordService>(PomodoroRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
