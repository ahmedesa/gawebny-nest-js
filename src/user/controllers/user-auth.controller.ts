import { Body, Controller, Get, Post } from '@nestjs/common';
import { RateLimit } from 'nestjs-rate-limiter';
import { CreateUserDTO } from '../dto/create-user-dto';
import { UserLoginDTO } from '../dto/user-login-dto';
import { UserService } from '../services/user.service';

@Controller('auth')
export class UserAuthController {
  constructor(private readonly User_service: UserService) {}
  @Post('login')
  @RateLimit({
    points: 3,
    duration: 300,
    errorMessage:
      'You have reached the limit. You have to wait 5 minutes before trying again.',
  })
  async login(@Body() UserAuthDTO: UserLoginDTO) {
    return await this.User_service.login(UserAuthDTO);
  }

  @Post('register')
  async register(@Body() CreateUserDTO: CreateUserDTO) {
    return await this.User_service.register(CreateUserDTO);
  }
}
