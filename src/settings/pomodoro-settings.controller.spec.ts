import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroSettingsController } from './pomodoro-settings.controller';
import { PomodoroSettingsService } from './pomodoro-settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('PomodoroSettingsController', () => {
  let controller: PomodoroSettingsController;
  let service: PomodoroSettingsService;

  const mockPomodoroSettingsService = {
    getSettings: jest.fn(),
    updateSettings: jest.fn(),
    resetSettings: jest.fn(),
    subtractFocusedHours: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PomodoroSettingsController],
      providers: [
        {
          provide: PomodoroSettingsService,
          useValue: mockPomodoroSettingsService
        }
      ]
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({canActivate: jest.fn(() => true)})
    .compile();

    controller = module.get<PomodoroSettingsController>(PomodoroSettingsController);
    service = module.get<PomodoroSettingsService>(PomodoroSettingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
