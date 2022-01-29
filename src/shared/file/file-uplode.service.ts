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
  private s3Instance: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3Instance = new S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
  }

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<AWSFile> {
    const uploadResult = await this.s3Instance
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
    await this.s3Instance
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      })
      .promise();
  }
}
