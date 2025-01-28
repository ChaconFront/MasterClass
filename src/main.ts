import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions:{//nos evita la conversion de tipos en los dtos, por ejemplo @type(()=>Number)
        enableImplicitConversion:true
      }
    }),
  );

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Master Classs- blog app ApI')
    .setDescription('Use the base API URL as http://localhost:3050/api')
    .setTermsOfService('http://localhost:3050/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENCE.txt',
    )
    .addServer('http://localhost:3050')
    .setVersion('1.0')
    .build();

  //insatancia de documento
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3050);
}
bootstrap();
