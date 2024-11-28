import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //swagger configuration
const config=new DocumentBuilder().setVersion('1.0').build();

//insatancia de documento
const document=SwaggerModule.createDocument(app,config);


  await app.listen(3050);
}
bootstrap();
