import { ApiPropertyOptional } from "@nestjs/swagger";

class SoundDto {
  @ApiPropertyOptional({ example: 50, description: 'Volume level from 0 to 100' })
  volume: number;

  @ApiPropertyOptional({ example: 'waves', description: 'URL of the sound file' })
  url: string;

  @ApiPropertyOptional({ example: 'waves', description: 'Icon representing the sound' })
  icon: string;
}

export class UpdateSoundPreferenceDto {
  @ApiPropertyOptional({
    type: [SoundDto],
    description: 'List of sound preferences',
    example: [
      {
        volume: 50,
        url: 'waves',
        icon: 'waves'
      },
      {
        volume: 75,
        url: 'fire',
        icon: 'fire'
      }
    ]
  })
  readonly sounds?: SoundDto[];
}