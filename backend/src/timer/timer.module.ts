import { Module } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Timer, TimerSchema } from './timer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Timer.name, schema: TimerSchema }]),
  ],
  providers: [TimerService],
  controllers: [TimerController],
})
export class TimerModule {}
