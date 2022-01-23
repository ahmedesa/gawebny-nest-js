import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from '../user.entity';
import { CreateUserDTO } from '../dto/create-user-dto';
import { UpdateUserDTO } from '../dto/update-user-dto';
import { UserService } from '../services/user.service';
import RoleGuard from '../role.guard';
import { UserTypes } from '../user-type';
import { JWTAuthGuard } from '../jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// @UseGuards(RoleGuard(UserTypes.ADMIN))
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

  @Post('avatar')
  // @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request, @UploadedFile() file: Express.Multer.File) {
    return this.service.addAvatar(
      1,
      file.buffer,
      file.originalname,
    );
  }
}
