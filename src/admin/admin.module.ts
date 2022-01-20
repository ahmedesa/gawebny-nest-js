import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { AdminRepository } from './repositories/admin.repository';
import { AdminAuthController } from './controllers/admin-auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  providers: [AdminService],
  controllers: [AdminController, AdminAuthController],
  exports: [AdminService],
})
export class AdminModule {}
