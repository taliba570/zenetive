import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroSettingsService } from './pomodoro-settings.service';

describe('PomodoroSettingsService', () => {
  let service: PomodoroSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PomodoroSettingsService],
    }).compile();

    service = module.get<PomodoroSettingsService>(PomodoroSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
