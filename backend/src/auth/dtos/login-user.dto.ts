import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'taliballauddin@gmail.com',
    description: 'user email',
  })
  email: string;

  @ApiProperty({ example: '123123123', description: 'user password' })
  password: string;
}
