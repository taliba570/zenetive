import { Test, TestingModule } from '@nestjs/testing';
import { SoundPreferenceService } from './sound-preference.service';

describe('SoundPreferenceService', () => {
  let service: SoundPreferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoundPreferenceService],
    }).compile();

    service = module.get<SoundPreferenceService>(SoundPreferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
