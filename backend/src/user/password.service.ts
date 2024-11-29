import { Injectable } from "@nestjs/common";
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
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
}