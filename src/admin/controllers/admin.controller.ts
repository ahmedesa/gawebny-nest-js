import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AdminEntity } from '../admin.entity';
import { CreateAdminDTO } from '../dto/create-admin-dto';
import { UpdateAdminDTO } from '../dto/update-admin-dto';
import { AdminService } from '../services/admin.service';

@Crud({
  model: { type: AdminEntity },
  params: {},
  dto: {
    create: CreateAdminDTO,
    update: UpdateAdminDTO,
  },
})
@Controller('admins')
export class AdminController implements CrudController<AdminEntity> {
  constructor(public service: AdminService) {}
}
