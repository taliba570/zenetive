import { Test, TestingModule } from '@nestjs/testing';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLabelDto } from './dtos/create-label.dto';

describe('LabelsController', () => {
  let controller: LabelsController;
  let service: LabelsService;

  const mockLabelService = {
    createLabel: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    findAllLabelsByUser: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelsController],
      providers: [
        {
          provide: LabelsService,
          useValue: mockLabelService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    controller = module.get<LabelsController>(LabelsController);
    service = module.get<LabelsService>(LabelsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create label', () => {
    it('should call service.createLabel with correct parameters and return the result', async () => {
      const createLabelDto: CreateLabelDto = {
        name: 'Test label',
        color: '#fff',
      };

      const mockUserId = '123456';
      const mockRequest = { user: { userId: mockUserId } };
      const expectedResult = { id: 1, ...createLabelDto };

      mockLabelService.createLabel.mockResolvedValue(expectedResult);

      const result = await controller.create(createLabelDto, mockRequest);

      expect(service.createLabel).toHaveBeenCalledWith(
        createLabelDto,
        mockUserId,
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
