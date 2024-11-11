import { Test, TestingModule } from '@nestjs/testing';
import { PomodoroSettingsController } from './pomodoro-settings.controller';
import { PomodoroSettingsService } from './pomodoro-settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PomodoroSettings } from './pomodoro-setting.entity';
import { Types } from 'mongoose';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

describe('PomodoroSettingsController', () => {
  let controller: PomodoroSettingsController;
  let service: PomodoroSettingsService;

  const mockPomodoroSettingsService = {
    getSettings: jest.fn(),
    updateSettings: jest.fn(),
    resetSettings: jest.fn(),
    subtractFocusedHours: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PomodoroSettingsController],
      providers: [
        {
          provide: PomodoroSettingsService,
          useValue: mockPomodoroSettingsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PomodoroSettingsController>(
      PomodoroSettingsController,
    );
    service = module.get<PomodoroSettingsService>(PomodoroSettingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get settings', () => {
    it('get pomodoro settings with service.getSettings and validate returned value', async () => {
      const mockUserId = '614d9f2332f0a1b5c4c2a645';
      const mockUser = { user: { userId: mockUserId } };
      const expectedPmodoroSetting: Partial<PomodoroSettings> = {
        _id: '1',
        userId: new Types.ObjectId(mockUserId),
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        cyclesBeforeLongBreak: 4,
        dailyPomodoroTarget: 8,
        totalFocusedHours: 2,
      };

      mockPomodoroSettingsService.getSettings.mockResolvedValue(
        expectedPmodoroSetting,
      );

      const result = await controller.getSettings(mockUser);

      expect(service.getSettings).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(expectedPmodoroSetting);
    });

    it('should throw a NotFoundException if settings are not found', async () => {
      const mockUserId = new Types.ObjectId('614d9f2332f0a1b5c4c2a645');
      const mockUser = { user: { userId: mockUserId } };

      mockPomodoroSettingsService.getSettings.mockRejectedValue(
        new Error('Settings not found'),
      );

      await expect(controller.getSettings(mockUser)).rejects.toThrow(
        'Settings not found',
      );
    });
  });

  describe('PomodoroSettingsController (e2e)', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          AppModule,
          MongooseModule.forRoot(uri), // Use in-memory database URI
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
      await mongod.stop(); // Stop the in-memory MongoDB server
    });

    it('/pomodoro-settings (GET) - should return 401 - Unautorized', async () => {
      const response = await request(app.getHttpServer())
        .get('/pomodoro-settings')
        .expect(401);

      expect(response.body).toBeDefined();
    });
  });
});
