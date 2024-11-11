import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Types } from 'mongoose';
import { TaskPriority } from '../commons/enums/task-priority';
import { CreateTaskDto } from './dtos/create-task.dto';

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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create task', async () => {
    const mockUserId = '614d9f2332f0a1b5c4c2a645';
    const mockLabelId = '614d9f2332f0a1b5c4c2a645';
    const mockUser = { user: { userId: mockUserId } };
    const mockTask: CreateTaskDto = {
      name: 'Test Task',
      duration: 25,
      isCompleted: true,
      priority: TaskPriority.LOW,
      labels: [new Types.ObjectId(mockLabelId)],
      estimatedPomodoroSessions: 3,
    };

    mockTaskService.create.mockResolvedValue(mockTask);

    const result = await controller.create(mockUser, mockTask);

    expect(service.create).toHaveBeenCalledWith(mockTask, mockUserId);
    expect(result).toEqual(mockTask);
  });
});
