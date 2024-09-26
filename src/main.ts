import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const whiteList = [
    'http://localhost:9000',
    'https://master.d3muok6acru34g.amplifyapp.com',
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
  const app = await NestFactory.create(AppModule, { cors: options });

  const config = new DocumentBuilder()
    .setTitle('Pomodoro Tracker API')
    .setDescription('API documentation for Pomodoro Tracker project')
    .setVersion('1.0')
    .addTag('pomodoro')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
