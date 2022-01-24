import { Global, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

interface AWSFile {
  key: string;
  url: string;
}

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<AWSFile> {
    const s3 = new S3();

    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    return {
      key: uploadResult.Key,
      url: uploadResult.Location,
    };
  }

  async deletePublicFile(key: string) {
    const s3 = new S3();

    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      })
      .promise();
  }
}