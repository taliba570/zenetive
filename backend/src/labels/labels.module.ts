import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Label, LabelSchema } from './label.entity';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}
