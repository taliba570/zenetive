import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {
  @ApiProperty({ example: 'taliballauddin@gmail.com', description: 'user email' })
  email: string;
}