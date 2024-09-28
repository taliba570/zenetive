import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ImATeapotException, INestApplication } from '@nestjs/common';
import * as bodyParser from 'body-parser'
import * as compression from 'compression'

async function bootstrap() {
  
  
  const app = await NestFactory.create(AppModule);
  const whitelist = [
    'http://localhost:9000',
    'https://master.d3muok6acru34g.amplifyapp.com'
  ];
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: function(origin, callback) {
      console.log('checking cors permission')
      if (!origin) {
        callback(null, true);
        return;
      }
      if (
        whitelist.includes(origin) ||
        !!origin.match(/localhost$/)
      ) {
        console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(new ImATeapotException('Not allowed by CORS'), false);
      }
    }
  })
  useBodyParser(app);
  app.use(compression());
  bootstrapSwagger(app);

  await app.listen(3000);
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
