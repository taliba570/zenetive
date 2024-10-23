import { IsString, MinLength } from "class-validator";

export class SearchTasksDto {
  @IsString()
  @MinLength(3, { message: 'Search query must be at least 3 characters long.' })
  q: string;
}