import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroSettingsController } from './pomodoro-settings.controller';

describe('PomodoroSettingsController', () => {
  let controller: PomodoroSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PomodoroSettingsController],
    }).compile();

    controller = module.get<PomodoroSettingsController>(PomodoroSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
