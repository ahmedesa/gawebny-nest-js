import { Body, Controller, Get } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminLoginDTO } from '../dto/admin-login-dto';

@Controller('admin')
export class AdminAuthController {
  constructor(private readonly admin_service: AdminService) {}
  @Get('login')
  async login(@Body() adminAuthDTO: AdminLoginDTO) {
    return await this.admin_service.login(adminAuthDTO);
  }
}
