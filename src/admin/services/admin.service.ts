import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../admin.entity';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminService extends TypeOrmCrudService<AdminEntity> {
  constructor(
    @InjectRepository(AdminRepository) adminRepository: AdminRepository,
  ) {
    super(adminRepository);
  }
}
