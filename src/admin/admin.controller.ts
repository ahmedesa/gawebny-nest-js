import { Controller } from '@nestjs/common';
import {
  CreateManyDto,
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
} from '@nestjsx/crud';
import { AdminService } from './admin.service';
import { AdminEntity } from './admin.entity';
import { CreateAdminDTO } from './dto/create-admin-dto';
import { UpdateAdminDTO } from './dto/update-admin-dto';

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
