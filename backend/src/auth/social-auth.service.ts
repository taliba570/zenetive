import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { SignInData } from "./dtos/user.dto";

@Injectable()
export class SocialAuthService {
    private readonly googleUserInfo: string = process.env.GOOGLE_USER_INFO || 'https://www.googleapis.com/oauth2/v1/userinfo';
    private readonly googleOAuth: string = process.env.GOOGLE_OAUTH_URL || 'https://oauth2.googleapis.com/token';
    private readonly googleClientId: string = process.env.GOOGLE_CLIENT_ID || '1095986755368-l4i718bqntmup4u49h09de7op3j41j42.apps.googleusercontent.com';
    private readonly googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET || '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';
    private readonly googleRedirectUrl: string = process.env.GOOGLE_REDIRECT_URL || 'http://localhost:3000/auth/social/google/callback';

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}
    
    
    async handleCallback(provider: string, code: string): Promise<any> {
        try {
            const tokenResponse: any = await this.getAccessToken(provider, code);
            const userProfile = await this.getUserProfile(provider, tokenResponse.access_token);
            return this.registerOrLoginUser(userProfile);
        } catch(error) {
            throw new HttpException('Social login failed', HttpStatus.UNAUTHORIZED);
        }
    }

    async getAccessToken(provider: string, code: string) {
        if (provider === 'google') {
            const response = await axios.post(this.googleOAuth, {
                client_id: this.googleClientId,
                client_secret: this.googleClientSecret,
                redirectUrl: this.googleRedirectUrl,
                code,
                grant_type: 'authorization_code',
            })
        }
        throw new BadRequestException(`Unsupported provider: ${provider}`);
    }

    async getUserProfile(provider: string, accessToken: string) {
        if (provider == 'google') {
            const response = await axios.get(this.googleUserInfo, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        }
        throw new BadRequestException(`Invalid provider: ${provider}`)
    }

    async registerOrLoginUser(userProfile: any) {
        const { email, name, id } = userProfile;

        const user = await this.userService.findByEmail(email);
        console.log(user);
        if (!user) {
            // signup
        } else {
            const signInData: SignInData = {
                id: user._id.toString(),
                email: user.email,
            }
            return await this.authService.signIn(signInData);
        }

        return { 
            message: 'User authenticated successfully', 
            email, 
            name, 
            id 
        };
    }
}