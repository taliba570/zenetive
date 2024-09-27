import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser'
import * as compression from 'compression'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  enableCors(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  useBodyParser(app);
  app.use(compression());
  bootstrapSwagger(app);

  await app.listen(80);
}

function enableCors(app: INestApplication) {
  const whiteList = [
    'http://localhost:9000',
    '13.227.74.26',
    '13.227.74.80',
    '13.227.74.120',
    '13.227.74.13',
    'localhost:9000',
    'https://master.d3muok6acru34g.amplifyapp.com',
    'master.d3muok6acru34g.amplifyapp.com',
    'https://*.amplifyapp.com',
    '*.amplifyapp.com',
    '*'
  ];
  
  const options = {
    origin: process.env.NODE_ENV == 'prod' ? whiteList : true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type,Accept,Authorization,email,x-request-id,request-type,X-Service-Identifier',
    exposedHeaders: 'X-Service-Identifier'
  };
  app.enableCors(options);
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
  SwaggerModule.setup('documentation', app, document)
}

bootstrap();
