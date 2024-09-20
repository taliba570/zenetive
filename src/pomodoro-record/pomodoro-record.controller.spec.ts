import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroRecordController } from './pomodoro-record.controller';

describe('PomodoroRecordController', () => {
  let controller: PomodoroRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PomodoroRecordController],
    }).compile();

    controller = module.get<PomodoroRecordController>(PomodoroRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
