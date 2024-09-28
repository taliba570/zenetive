import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ImATeapotException, INestApplication } from '@nestjs/common';
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('api.port');
  const methods = configService.get('api.methods');
  const whitelistedIPs = configService.get('api.whitelistedIPs');
  
  app.enableCors({
    methods: methods,
    origin: function(origin, callback) {
      determineOrigin(origin, callback, whitelistedIPs);
    },
  });
  useBodyParser(app);
  app.use(compression());
  bootstrapSwagger(app);

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
      return
    }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8')
    }
  }

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true, limit: '50mb' }))
  app.use(bodyParser.json({ verify: rawBodyBuffer, limit: '50mb' }))
}

function bootstrapSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Pomodoro Tracker API')
    .setDescription('API documentation for Pomodoro Tracker project')
    .setVersion('1.0')
    .addTag('pomodoro')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}

bootstrap();
