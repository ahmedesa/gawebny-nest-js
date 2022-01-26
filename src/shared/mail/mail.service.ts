import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
@Injectable()
export default class MailService {
  private nodemailerTransport: Mail;

  constructor(
    @InjectQueue('mail-queue') private queue: Queue,
    private readonly configService: ConfigService,
  ) {
    this.nodemailerTransport = createTransport({
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendMailWithQueue(options: Mail.Options) {   
    await this.queue.add('mail-job', options);
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail({
      ...options,
      from: this.configService.get('MAIL_FROM'),
    });
  }
}
