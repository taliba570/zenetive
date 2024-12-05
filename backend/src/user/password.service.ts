import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { genSalt, hash, compare } from 'bcrypt';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}
    private readonly pepper = process.env.PEPPER || 'o@E9eRzdS@2P4E!$';

    async hashPassword(password: string) {
        try {
            const saltRounds = parseInt(process.env.SALT_ROUNDS || '12', 10);
            const normalizedPassword = password.trim();
            const salt = await genSalt(saltRounds);
            return await hash(normalizedPassword + this.pepper, salt);
        } catch (error) {
            throw new Error('Error hashing password')
        }
    }

    async hashString(text: string): Promise<string> {
        return argon2.hash(text);
    }

    async validatehashedString(originalString: string, hashedString: string): Promise<boolean> {
        return argon2.verify(hashedString, originalString);
    }

    async comparePassword(password: string, hashedPassword: string) {
        try {
            return await compare(password + this.pepper, hashedPassword);
        } catch (error) {
            throw new Error('Error comparing password')
        }
    }

    async validatePasswordStrength(password: string) {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        return strongPasswordRegex.test(password);
    }

    async generateToken(user) {
        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('refresh-jwt.secret'),
            expiresIn: this.configService.get<string>('refresh-jwt.expiresIn')
        });
        return {
            accessToken,
            refreshToken
        };
    }
}