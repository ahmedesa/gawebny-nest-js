import { DatabaseModule } from './config/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    DatabaseModule,
    AdminModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
