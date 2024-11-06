import { Test, TestingModule } from '@nestjs/testing';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('LabelsController', () => {
  let controller: LabelsController;
  let service: LabelsService;

  const mockLabelService = {
    createLabel: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    findAllLabelsByUser: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelsController],
      providers: [{
        provide: LabelsService,
        useValue: mockLabelService  
      }]
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: jest.fn(() => true)
    })
    .compile();

    controller = module.get<LabelsController>(LabelsController);
    service = module.get<LabelsService>(LabelsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
