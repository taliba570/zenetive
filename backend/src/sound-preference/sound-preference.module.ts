import { Module } from '@nestjs/common';
import { SoundPreferenceService } from './sound-preference.service';
import { SoundPreferenceController } from './sound-preference.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SoundPreference,
  SoundPreferenceSchema,
} from './entities/sound-setting.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SoundPreference.name, schema: SoundPreferenceSchema },
    ]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [SoundPreferenceController],
  providers: [SoundPreferenceService],
})
export class SoundPreferenceModule {}
