import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { HttpExceptionFilter } from '@src/presentation/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security - Helmet
  app.use(helmet());

  // CORS Configuration
  const corsOrigin = configService.get<string>('CORS_ORIGIN')?.split(',') || [
    'http://localhost:3000',
  ];
  app.enableCors({
    origin: corsOrigin,
    credentials: configService.get<string>('CORS_CREDENTIALS') === 'true',
  });

  // Global API prefix
  app.setGlobalPrefix('api/v1');

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Documentation
  if (configService.get('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('BookHub API')
      .setDescription('API for BookHub - Book Management Application')
      .setVersion('1.0')
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management')
      .addTag('books', 'Book catalog')
      .addTag('lists', 'Reading lists')
      .addTag('reviews', 'Book reviews and ratings')
      .addTag('social', 'Social features')
      .addTag('admin', 'Admin endpoints')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = configService.get<string>('PORT') || 3000;
  await app.listen(+port);

  console.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  if (configService.get('NODE_ENV') !== 'production') {
    console.log(
      `📚 Swagger documentation available at: http://localhost:${port}/api/docs`,
    );
  }
}
void bootstrap();
