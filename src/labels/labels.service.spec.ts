import { Test, TestingModule } from '@nestjs/testing';
import { LabelsService } from './labels.service';
import { getModelToken } from '@nestjs/mongoose';

describe('LabelsService', () => {
  let service: LabelsService;
  
  const mockLabelModel = {
    find: jest.fn(),
    create: jest.fn(),
    // Add other methods you need to mock
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabelsService,{
        provide: getModelToken('Label'), // Provide the LabelModel
        useValue: mockLabelModel, // Mock implementation
      }],
    }).compile();

    service = module.get<LabelsService>(LabelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
