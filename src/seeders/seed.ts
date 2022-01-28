import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { Seeder } from './seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  let seeder = await app.get(Seeder);

  try {
    await seeder.seed();
  } catch (error) {
    console.log(error);
  }

  app.close();
}
bootstrap();
