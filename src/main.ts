import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { credential } from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'https://master.d3muok6acru34g.amplifyapp.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

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
