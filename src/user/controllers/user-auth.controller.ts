import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserLoginDTO } from '../dto/user-login-dto';
import { UserService } from '../services/user.service';

@Controller('auth')
export class UserAuthController {
  constructor(private readonly User_service: UserService) {}
  @Post('login')
  async login(@Body() UserAuthDTO: UserLoginDTO) {
    return await this.User_service.login(UserAuthDTO);
  }
}
