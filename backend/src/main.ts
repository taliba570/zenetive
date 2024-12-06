import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ImATeapotException, INestApplication } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from './logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const cors = configService.get<string[]>('app.cors');
  const methods = configService.get<string[]>('app.methods');
  const port = configService.get<number>('app.port');
  
  app.enableCors({
    methods: methods,
    origin: function (origin, callback) {
      determineOrigin(origin, callback, cors);
    },
  });
  useBodyParser(app);
  app.use(compression());
  bootstrapSwagger(app);

  const customLogger = await app.resolve(CustomLogger);
  app.useLogger(customLogger);

  await app.listen(port);
}

function determineOrigin(origin, callback, whitelistedIPs) {
  if (!origin) {
    callback(null, true);
    return;
  }
  if (
    whitelistedIPs.includes(origin) ||
    !!origin.match(/localhost$/) ||
    !!origin.match(/master.d3muok6acru34g.amplifyapp.com$/)
  ) {
    callback(null, true);
  } else {
    callback(new ImATeapotException('Not allowed by CORS'), false);
  }
}

function useBodyParser(app: INestApplication) {
  const rawBodyBuffer = (req: any, _: any, buffer: any, encoding: any) => {
    if (!req.headers['stripe-signature']) {
      return;
    }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };

  app.use(
    bodyParser.urlencoded({
      verify: rawBodyBuffer,
      extended: true,
      limit: '50mb',
    }),
  );
  app.use(bodyParser.json({ verify: rawBodyBuffer, limit: '50mb' }));
}

function bootstrapSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Pomodoro Tracker API')
    .setDescription('API documentation for Pomodoro Tracker project')
    .setVersion('1.0')
    .addTag('pomodoro')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
