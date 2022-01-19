import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminService extends TypeOrmCrudService<AdminEntity>{

    constructor(@InjectRepository(AdminEntity) repo) {
        super(repo);
    }

}
