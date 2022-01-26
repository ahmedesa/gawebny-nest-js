import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import MailService from './mail.service';

@Processor('mail-queue')
export class MailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('mail-job')
  readOperationJob(job: Job<unknown>) {
    this.mailService.sendMail(job.data);
  }
}