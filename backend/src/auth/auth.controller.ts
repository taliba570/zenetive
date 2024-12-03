import { BadRequestException, Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { 
  ChangePasswordDto, 
  CreateLinkedUserDto, 
  CreateUserDto, 
  ForgotPasswordDto, 
  ForgotPasswordOtpDto, 
  LoginUserDto, 
  RefreshTokenDto, 
  SendVerificationEmailDto, 
  VerifyOtpDto
} from './dtos/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const user = await this.userService.create(name, email, password);
    return {
      message: 'User registered successfully',
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return await this.authService.signIn(req.user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    return await this.authService.refreshToken(refreshToken);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const response = await this.authService.setResetPasswordToken(user.id);

    return response;
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    const user = await this.userService.resetPassword(
      body.token,
      body.newPassword,
    );
    return { user: user, message: 'Password has been reset successfully' };
  }

  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {

  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Body() sendVerificationEmailDto: SendVerificationEmailDto) {

  }

  @Get('verify/:email/:token')
  async verifyToken(@Param('email') email: string, @Param('token') token: string): Promise<any> {
    const response = await this.userService.verifyToken(token, email);
    if (response) {
      return {
        message: 'Account successfully verified'
      }
    }
  }

  @Get('social/:provider/callback')
  async socialCallback() {

  }

  @Get('github/callback')
  async githubCallback(@Body() profile: CreateLinkedUserDto, @Request() req: any) {
    const { email } = profile;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exist');
    }

    const user = await this.userService.createUserWithGithub(profile);
    return {
      message: 'User registered successfully',
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }

  @Post('forgot-password-otp')
  async forgotPasswordOtp(@Body() forgotPasswordOtpDto: ForgotPasswordOtpDto) {
    const { email, phoneNumber } = forgotPasswordOtpDto;
    return await this.authService.forgotPasswordWithOtp(email, phoneNumber);
  }

  @Post('verify-otp-reset-password')
  async verifyOtpResetPassword(@Body() verifyOtpDto: VerifyOtpDto) {
    const { otpCode, sessionInfo, newPassword } = verifyOtpDto;
    return await this.authService.verifyOtpAndResetPassword(
      otpCode,
      sessionInfo,
      newPassword,
    );
  }
}
