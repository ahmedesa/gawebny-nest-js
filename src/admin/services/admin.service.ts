import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../admin.entity';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminLoginDTO } from '../dto/admin-login-dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../jwt-token.interface';

@Injectable()
export class AdminService extends TypeOrmCrudService<AdminEntity> {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
  ) {
    super(adminRepository);
  }

  async login(adminLoginDTO: AdminLoginDTO) {
    const admin = await this.adminRepository.findOne({
      email: adminLoginDTO.email,
    });

    if (!admin || !(await admin.comparePassword(adminLoginDTO.password))) {
      throw new HttpException('invalid user or password', 404);
    }

    return this.buildAdminResponse(admin);
  }

  buildAdminResponse(admin: AdminEntity) {
    return {
      ...admin,
      token: this.generateJWTToken(admin),
    };
  }

  generateJWTToken(admin: AdminEntity): string {
    const payload: JWTPayload = { id: Number(admin.id) };

    return this.jwtService.sign(payload);
  }
}
