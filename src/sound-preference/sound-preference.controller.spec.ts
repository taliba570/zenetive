import { Test, TestingModule } from '@nestjs/testing';
import { SoundPreferenceController } from './sound-preference.controller';
import { SoundPreferenceService } from './sound-preference.service';

describe('SoundPreferenceController', () => {
  let controller: SoundPreferenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoundPreferenceController],
      providers: [SoundPreferenceService],
    }).compile();

    controller = module.get<SoundPreferenceController>(SoundPreferenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
