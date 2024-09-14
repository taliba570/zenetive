import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; 
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,  // Required for handling authentication strategies
    JwtModule.register({
      global: true,
      secret: '123123123',  // Use environment variable for the secret
      signOptions: { expiresIn: '1d' },  // Token expires in 1 hour
    }),
  ],
  providers: [JwtStrategy, JwtService, AuthService],  // Add JwtStrategy here
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
