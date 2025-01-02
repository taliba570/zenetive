import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeHelper {
  minutesToMilliseconds(minutes: number): number {
    return minutes * 60 * 1000;
  }

  isWithinMinutesAfter(timestamp: number, minutes: number): boolean {
    const now: number = new Date().getTime();

    return now - timestamp < this.minutesToMilliseconds(minutes);
  }
}
