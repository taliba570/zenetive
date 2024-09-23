import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pomodoro Tracker API')
    .setDescription('API documentation for Pomodoro Tracker project')
    .setVersion('1.0')
    .addTag('pomodoro')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.enableCors({
    origin: [
      'https://master.d3muok6acru34g.amplifyapp.com/',
      'https://master.d3muok6acru34g.amplifyapp.com',
      /\.amplifyapp\.com$/,
      '*',
    ],  // Specify the exact URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // If you need to allow credentials (cookies, auth)
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(80);
}
bootstrap();
