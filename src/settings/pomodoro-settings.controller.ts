import { Body, Controller, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PomodoroSettingsService } from './pomodoro-settings.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PomodoroSettings } from './pomodoro-setting.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatePomodoroSettingsDto } from './dtos/update-pomodoro-settings.dto';

@ApiTags('Pomodoro Settings')
@ApiBearerAuth()
@Controller('pomodoro-settings')
export class PomodoroSettingsController {
  constructor(private readonly pomodoroSettingsService: PomodoroSettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get Pomodoro settings for a user' })
  @ApiResponse({ status: 200, description: 'Pomodoro settings retrieved', type: PomodoroSettings })
  @ApiResponse({ status: 404, description: 'Settings not found' })
  getSettings(@Request() req: any): Promise<PomodoroSettings> {
    return this.pomodoroSettingsService.getSettings(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update Pomodoro settings for a user' })
  @ApiResponse({ status: 200, description: 'Settings updated', type: PomodoroSettings })
  updateSettings(
    @Request() req: any, 
    @Body() updateData: UpdatePomodoroSettingsDto
  ): Promise<PomodoroSettings> {
    return this.pomodoroSettingsService.updateSettings(req.user.userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('reset')
  @ApiOperation({ summary: 'Reset Pomodoro settings to default' })
  @ApiResponse({ status: 200, description: 'Settings reset to default', type: PomodoroSettings })
  resetSettings(@Request() req: any): Promise<PomodoroSettings> {
    return this.pomodoroSettingsService.resetSettings(req.user.userId);
  }
}
