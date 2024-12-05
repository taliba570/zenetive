import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req) {
        return await this.userService.findOne(req.user.id)
    }
}
