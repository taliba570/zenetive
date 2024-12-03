import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt"

export default registerAs("jwt", (): JwtModuleOptions => ({
    global: true,
    secret: process.env.JWT_SECRET || ']o40|Tn#Y#kzw>X',
    signOptions: {
        expiresIn: process.env.JWT_EXPIRATION || '30d'
    }
}));