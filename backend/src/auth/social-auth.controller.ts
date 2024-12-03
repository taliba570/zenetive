import { Controller, Get, Param, Query } from "@nestjs/common";
import { SocialAuthService } from "./social-auth.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth/social')
export class SocialAuthController {
    constructor(
        private readonly socialAuthService: SocialAuthService
    ) {}

    @Get(':provider/callback')
    async socialCallback(
        @Param('provider') provider: string,
        @Query('code') code: string
    ) {
        console.log(provider, code)
        return this.socialAuthService.handleCallback(provider, code);
    }
}