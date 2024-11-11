import { Test, TestingModule } from '@nestjs/testing';
import { SoundPreferenceController } from './sound-preference.controller';
import { SoundPreferenceService } from './sound-preference.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Sound, SoundPreference } from './entities/sound-setting.entity';
import { Types } from 'mongoose';

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

  it('should get sound preference from service.get and confirm response', async () => {
    const mockUserId = '614d9f2332f0a1b5c4c2a645';
    const mockUser = { user: { userId: mockUserId } };
    const mockSoundPreference: Partial<SoundPreference> = {
      userId: mockUserId,
      sounds: [
        {
          _id: new Types.ObjectId(),
          volume: 50,
          url: 'http://example.com/sound.mp3',
          icon: 'sound-icon.png',
        } as Sound,
      ],
    };

    mockSoundPreferenceService.get.mockResolvedValue(mockSoundPreference);
    const result = await controller.get(mockUser);

    expect(service.get).toHaveBeenCalledWith(mockUserId);
    expect(result).toEqual(mockSoundPreference);
  });
});
