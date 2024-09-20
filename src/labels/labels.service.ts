import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Label } from './label.entity';
import { Model } from 'mongoose';
import { CreateLabelDto } from './dtos/create-label.dto';
import { UpdateLabelDto } from './dtos/update-label.dto';

@Injectable()
export class LabelsService {
  constructor(
    @InjectModel(Label.name) private labelModel: Model<Label>
  ) {}

  async createLabel(createLabelDto: CreateLabelDto, userId: string): Promise<Label> {
    const newLabel = new this.labelModel({
      ...createLabelDto,
      userId,
    });
    return newLabel.save();
  }

  async findAll(): Promise<Label[]> {
    return this.labelModel.find().exec();
  }

  async update(id: string, updateLabelDto: UpdateLabelDto): Promise<Label> {
    const updatedLabel = await this.labelModel.findByIdAndUpdate(id, updateLabelDto, { new: true }).exec();
    if (!updatedLabel) {
      throw new NotFoundException(`Label with ID "${id}" not found`);
    }
    return updatedLabel;
  }

  async remove(id: string): Promise<void> {
    const result = await this.labelModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Label with ID "${id}" not found`);
    }
  }

  async findAllLabelsByUser(userId: string): Promise<Label[]> {
    return this.labelModel.find({ userId }).exec();
  }
}
