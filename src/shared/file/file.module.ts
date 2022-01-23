import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from './file-uplode.service';

@Module({
  imports: [ConfigModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FileModule {}
