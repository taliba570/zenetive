import { Controller, Post, Get, Param, Body, Delete, Request, UseGuards, Query, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PomodoroRecordService } from './pomodoro-record.service';
import { PomodoroRecord } from './pomodoro-record.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePomodoroRecordDto, UpdatePomodoroRecordDto } from './dtos/create-pomodoro-record.dto';
import { DateRangeDto } from './dtos/date-range.dto';

@ApiTags('Pomodoro Records')
@ApiBearerAuth()
@Controller('pomodoro-records')
export class PomodoroRecordController {
  constructor(private readonly pomodoroRecordService: PomodoroRecordService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Save a completed Pomodoro session' })
  @ApiResponse({ status: 201, description: 'Pomodoro session saved', type: PomodoroRecord })
  async saveRecord(@Body() createPomodoroRecordDto: CreatePomodoroRecordDto, @Request() req: any) {
    return await this.pomodoroRecordService.saveRecord(createPomodoroRecordDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all Pomodoro sessions for a user' })
  @ApiResponse({ status: 200, description: 'User Pomodoro records retrieved', type: [PomodoroRecord] })
  getUserRecords(@Request() req: any): Promise<PomodoroRecord[]> {
    return this.pomodoroRecordService.getUserRecords(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a Pomodoro record' })
  @ApiResponse({ status: 200, description: 'Pomodoro record updated' })
  async updateRecord(
    @Param('id') id: string, 
    @Body() updatePomodoroRecordDto: UpdatePomodoroRecordDto, 
    @Request() req: any
  ): Promise<PomodoroRecord> {
    return await this.pomodoroRecordService.updateRecord(id, req.user.userId, updatePomodoroRecordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':recordId')
  @ApiOperation({ summary: 'Delete a Pomodoro record' })
  @ApiResponse({ status: 200, description: 'Pomodoro record deleted' })
  deleteRecord(@Param('recordId') recordId: string, @Request() req: any): Promise<void> {
    return this.pomodoroRecordService.deletePomodoroRecord(recordId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/count-by-day')
  @ApiOperation({ summary: 'Get Pomodoro session count per day within a date range' })
  async getPomodoroSessionsCountByDay(
    @Query() dateRangeDto: DateRangeDto,
    @Request() req: any
  ) {
    return this.pomodoroRecordService.getPomodoroSessionsCountByDay(req.user.userId, dateRangeDto);
  }
}
