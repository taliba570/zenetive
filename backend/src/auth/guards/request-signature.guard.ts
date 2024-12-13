import { InjectRedis } from "@nestjs-modules/ioredis";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import Redis from "ioredis";
import { TimeHelper } from "../../commons/helpers/time.helper";
import { PasswordService } from "../../user/password.service";
import { MessageParams } from "../dtos/message-params.dto";

@Injectable()
export class RequestSignatureGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly passwordService: PasswordService,
        private readonly timeHelper: TimeHelper,
        @InjectRedis() private redisService: Redis,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const timestamp: number = +request?.headers?.['x-timestamp'];
        const signature: string | undefined = request?.headers?.['x-signature'] as string;
        const nonce: string = request?.headers?.['x-request-nonce'] as string;
        const clientId: string = request?.headers?.['x-client-id'] as string;
        
        if (!signature || !clientId || !timestamp || !nonce) {
            return false;
        }

        const isValidTimestamp = await this.validateTimeStamp(timestamp);
        if (!isValidTimestamp) return false;

        const isValidNonce = await this.validateNonce(nonce, request);
        if (!isValidNonce) return false;

        const messageParams: MessageParams = {url:request?.originalUrl,body:request?.body,nonce,timestamp} as MessageParams;
        const message: string = JSON.stringify(messageParams);
        const clientKey: string = await this.getClientKey();
        return this.validateSignature(message, signature, clientKey);
    }

    private async getClientKey(): Promise<string> {
        return this.configService.get<string>('app.clientId');
    }

    private async validateNonce(nonce: string, req: Request) {
        if (!nonce) return false;

        const nonceExist = await this.redisService.get(`nonce:${nonce}`);
        if (nonceExist) {
            return false;
        }
        
        await this.redisService.set(`nonce:${nonce}`, `${req.method}:${req.originalUrl}`);
        return !nonceExist;
    }

    private async validateTimeStamp(timestamp: number) {
        if (!timestamp) return false;

        if (
            this.timeHelper.isWithinMinutesAfter(
                timestamp, 
                this.configService.get<number>('app.requestExpiry')/60
            )
        )
            return true;

        return false;
    }

    private async validateSignature(message: string, clientSignature: string, secret: string) {
        return await this.passwordService.createHmacSignature(message, secret) === clientSignature;
    }
}