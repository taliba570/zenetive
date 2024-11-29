import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Talib Allauddin', description: 'user full name' })
  name: string;

  @ApiProperty({
    example: 'taliballauddin@gmail.com',
    description: 'user email',
  })
  email: string;

  @ApiProperty({ example: '123123123', description: 'user password' })
  password: string;
}


export class CreateLinkedUserDto {
  @ApiProperty({ example: 'Talib Allauddin', description: 'user full name' })
  name: string;

  @ApiProperty({
    example: 'taliballauddin@gmail.com',
    description: 'user email',
  })
  email: string;

  @ApiProperty({
    example: 'https://zeeshan-images.s3.eu-north-1.amazonaws.com/favicon2.png',
    description: 'user photo',
  })
  photo?: string;

  @ApiProperty({
    example: '+923430505458',
    description: 'user phone number',
  })
  phone?: string;

  @ApiProperty({
    example: 'false',
    description: 'if user is verified',
  })
  isVerified: boolean;
}
