import { Controller, Get, Body, Patch, Param, Request, Put, UseGuards } from '@nestjs/common';
import { SoundPreferenceService } from './sound-preference.service';
import { UpdateSoundPreferenceDto } from './dto/update-sound-setting.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SoundPreference } from './entities/sound-setting.entity';

@ApiTags('Sound Settings')
@ApiBearerAuth()
@Controller('sound-settings')
export class SoundPreferenceController {
  constructor(private readonly SoundPreferenceService: SoundPreferenceService) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiOperation({ summary: 'Reset Pomodoro settings to default' })
  @ApiResponse({ status: 200, description: 'Settings reset to default', type: SoundPreference })
  update(
    @Request() req: any, 
    @Body() updateData: UpdateSoundPreferenceDto
  ) {
    console.log(updateData, 'controller');
    return this.SoundPreferenceService.update(req?.user?.userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get Pomodoro settings for a user' })
  @ApiResponse({ status: 200, description: 'Pomodoro settings retrieved', type: SoundPreference })
  @ApiResponse({ status: 404, description: 'Settings not found' })
  get(@Request() req: any) {
    return this.SoundPreferenceService.get(req?.user?.userId);
  }
}
