import { Test, TestingModule } from '@nestjs/testing';
import { SoundPreferenceService } from './sound-preference.service';
import { getModelToken } from '@nestjs/mongoose';

describe('SoundPreferenceService', () => {
  let service: SoundPreferenceService;

  const mockSoundPreferenceModel = {
    findOneAndUpdate: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoundPreferenceService,
        {
          provide: getModelToken('SoundPreference'),
          useValue: mockSoundPreferenceModel,
        },
      ],
    }).compile();

    service = module.get<SoundPreferenceService>(SoundPreferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
