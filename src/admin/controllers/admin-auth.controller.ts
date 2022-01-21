import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminLoginDTO } from '../dto/admin-login-dto';

@Controller('auth')
export class AdminAuthController {
  constructor(private readonly admin_service: AdminService) {}
  @Post('login')
  async login(@Body() adminAuthDTO: AdminLoginDTO) {
    return await this.admin_service.login(adminAuthDTO);
  }
}
