import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { Seeder } from './seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seeder = await app.get(Seeder);

  try {
    await seeder.seed();
  } catch (error) {
    console.log(error);
  }

  app.close();
}
bootstrap();
