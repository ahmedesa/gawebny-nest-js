import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminService extends TypeOrmCrudService<AdminEntity> {
  constructor(@InjectRepository(AdminEntity) repo) {
    super(repo);
  }

  public async getAdminByEmail(email: string): Promise<AdminEntity> {
    let admin = await this.repo.findOne({ email });

    if (!admin) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return admin;
  }
}
