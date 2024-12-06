import { ConfigModuleOptions } from "@nestjs/config";
import dbConfig from "./db.config";
import jwtConfig from "./jwt.config";
import appConfig from "./app.config";
import refreshJwtConfig from "./refresh-jwt.config";

export const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    expandVariables: true,
    envFilePath: ['.env'],
    load: [appConfig, jwtConfig, refreshJwtConfig, dbConfig],
};