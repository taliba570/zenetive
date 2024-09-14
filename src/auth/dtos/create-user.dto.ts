import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'Talib Allauddin', description: 'user full name' })
  name: string;

  @ApiProperty({ example: 'taliballauddin@gmail.com', description: 'user email' })
  email: string;

  @ApiProperty({ example: '123123123', description: 'user password' })
  password: string;
}