import { ApiProperty } from "@nestjs/swagger";

export class UpdatePomodoroSettingsDto {
  @ApiProperty({ example: 25, description: 'Work duration in minutes', default: 25 })
  readonly workDuration: number;

  @ApiProperty({ example: 5, description: 'Short break duration in minutes', default: 5 })
  readonly shortBreakDuration: number;

  @ApiProperty({ example: 15, description: 'Long break duration in minutes', default: 15 })
  readonly longBreakDuration: number;

  @ApiProperty({ example: 8, description: 'Daily pomodoro target sessions', default: 8 })
  readonly dailyPomodoroTarget: number;
}
