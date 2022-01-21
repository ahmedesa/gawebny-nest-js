import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from '../user.entity';
import { CreateUserDTO } from '../dto/create-user-dto';
import { UpdateUserDTO } from '../dto/update-user-dto';
import { UserService } from '../services/user.service';

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
