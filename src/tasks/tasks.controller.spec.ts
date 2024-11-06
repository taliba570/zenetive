import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTaskService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    assignLabelsToTask: jest.fn(),
    removeLabelFromTask: jest.fn(),
    searchTasks: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService
        }
      ]
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({canActivate: jest.fn(() => true)})
    .compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
