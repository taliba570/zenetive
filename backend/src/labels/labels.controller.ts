import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LabelsService } from './labels.service';
import { Label } from './label.entity';
import { CreateLabelDto } from './dtos/create-label.dto';
import { UpdateLabelDto } from './dtos/update-label.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Labels')
@ApiBearerAuth()
@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'create a new label' })
  @ApiResponse({
    status: 201,
    description: 'Label created successfully',
    type: Label,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Body() createLabelDto: CreateLabelDto,
    @Request() req,
  ): Promise<Label> {
    return this.labelsService.createLabel(createLabelDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all labels' })
  @ApiResponse({ status: 200, description: 'List of labels', type: [Label] })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() req,
  ): Promise<{
    labels: Label[];
    totalLabels: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
  }> {
    return this.labelsService.findAllLabelsByUser(page, limit, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a label by ID' })
  @ApiResponse({
    status: 200,
    description: 'Label updated successfully',
    type: Label,
  })
  @ApiResponse({ status: 404, description: 'Label not found' })
  async update(
    @Param('id') id: string,
    @Body() updateLabelDto: UpdateLabelDto,
  ): Promise<Label> {
    return this.labelsService.update(id, updateLabelDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a label by ID' })
  @ApiResponse({ status: 200, description: 'Label deleted successfully' })
  @ApiResponse({ status: 404, description: 'Label not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.labelsService.remove(id);
  }
}
