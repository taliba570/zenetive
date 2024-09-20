import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/login-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ForgotPasswordDto, ForgotPasswordOtpDto, VerifyOtpDto } from "./dtos/forgot-password.dto";
import { UserService } from "src/user/user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exist!');
    }

    const user = await this.userService.createUser(name, email, password);
    return { 
      message: 'User registered successfully', 
      user: {
        name: user.name,
        email: user.email
    } };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto
    return await this.authService.authenticate(email, password);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found!');
    }

    const response = await this.authService.setResetPasswordToken(user.id);

    return response;
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string, newPassword: string }) {
    const user = await this.userService.resetPassword(body.token, body.newPassword);
    return { message: 'Password has been reset successfully!' };
  }


  @Post('forgot-password-otp')
  async forgotPasswordOtp(@Body() forgotPasswordOtpDto: ForgotPasswordOtpDto) {
    const { email, phoneNumber } = forgotPasswordOtpDto;
    return await this.authService.forgotPasswordWithOtp(email, phoneNumber);
  }

  @Post('verify-otp-reset-password')
  async verifyOtpResetPassword(@Body() verifyOtpDto: VerifyOtpDto) {
    const { otpCode, sessionInfo, newPassword } = verifyOtpDto;
    return await this.authService.verifyOtpAndResetPassword(otpCode, sessionInfo, newPassword);
  }
}