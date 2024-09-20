import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AssignLabelToTask } from './dtos/assign-label-to-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  async findAll(@Request() req): Promise<Task[]> {
    return this.tasksService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Return task by Id' })
  @ApiParam({ name: 'id', description: 'Task ID'})
  async findById(@Param('id') taskId: string, @Request() req) {
    return await this.tasksService.findById(taskId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.'})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Request() req, @Body() taskData: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(taskData, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Task ID'})
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any
  ) {
    const userId = req.user.userId;
    return await this.tasksService.updateTask(taskId, userId, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Task ID' }) // Document the task ID parameter
  async deleteTask(@Param('id') taskId: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.tasksService.deleteTask(taskId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('assign-labels')
  async assignLabels(@Body() assignLabelsToTaskDto: AssignLabelToTask) {
    return this.tasksService.assignLabelsToTask(assignLabelsToTaskDto);
  }

  @Delete(':taskId/labels/:labelId')
  @ApiOperation({ summary: 'Remove a label from a task' })
  @ApiResponse({ status: 200, description: 'Label removed successfully', type: Task })
  @ApiResponse({ status: 404, description: 'Task or Label not found' })
  async removeLabelFromTask(
    @Param('taskId') taskId: string, 
    @Param('labelId') labelId: string
  ): Promise<Task> {
    return this.tasksService.removeLabelFromTask(taskId, labelId);
  }
}
