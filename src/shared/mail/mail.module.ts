import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import MailService from './mail.service';
import { BullModule } from '@nestjs/bull';
import { MailConsumer } from './mail-consumer';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  providers: [MailService, MailConsumer],
  exports: [MailService],
})
export class MailModule {}
