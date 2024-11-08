import { Test, TestingModule } from '@nestjs/testing';
import { SoundPreferenceController } from './sound-preference.controller';
import { SoundPreferenceService } from './sound-preference.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('SoundPreferenceController', () => {
  let controller: SoundPreferenceController;
  let service: SoundPreferenceService;

  const mockSoundPreferenceService = {
    update: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoundPreferenceController],
      providers: [
        {
          provide: SoundPreferenceService,
          useValue: mockSoundPreferenceService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<SoundPreferenceController>(
      SoundPreferenceController,
    );
    service = module.get<SoundPreferenceService>(SoundPreferenceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
