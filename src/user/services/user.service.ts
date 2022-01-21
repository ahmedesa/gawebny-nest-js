import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../jwt-token.interface';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserLoginDTO } from '../dto/user-login-dto';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    super(UserRepository);
  }

  async login(UserLoginDTO: UserLoginDTO) {
    const User = await this.UserRepository.findOne({
      email: UserLoginDTO.email,
    });

    if (!User || !(await User.comparePassword(UserLoginDTO.password))) {
      throw new HttpException('invalid user or password', 404);
    }

    return this.buildUserResponse(User);
  }

  buildUserResponse(User: UserEntity) {
    return {
      ...User,
      token: this.generateJWTToken(User),
    };
  }

  generateJWTToken(User: UserEntity): string {
    const payload: JWTPayload = { id: Number(User.id) };

    return this.jwtService.sign(payload);
  }
}
