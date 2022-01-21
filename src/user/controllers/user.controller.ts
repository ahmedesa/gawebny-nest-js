import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from '../user.entity';
import { CreateUserDTO } from '../dto/create-user-dto';
import { UpdateUserDTO } from '../dto/update-user-dto';
import { UserService } from '../services/user.service';
import RoleGuard from '../role.guard';
import { UserTypes } from '../user-type';

@UseGuards(RoleGuard(UserTypes.ADMIN))
@Crud({
  model: { type: UserEntity },
  params: {},
  dto: {
    create: CreateUserDTO,
    update: UpdateUserDTO,
  },
})
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
}
