import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../jwt-token.interface';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserLoginDTO } from '../dto/user-login-dto';
import { CreateUserDTO } from '../dto/create-user-dto';
import { FilesService } from 'src/shared/file/file-uplode.service';
import MailService from 'src/shared/mail/mail.service';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly filesService: FilesService,
    private readonly mailService: MailService,
  ) {
    super(userRepository);
  }
  async findFirst(options: any) {
    const question = await this.userRepository.findOne(options);

    if (!question) {
      throw new HttpException('invalid user or password', 404);
    }

    return question;
  }

  async login(UserLoginDTO: UserLoginDTO) {
    const User = await this.userRepository.findOne({
      email: UserLoginDTO.email,
    });

    if (!User || !(await User.comparePassword(UserLoginDTO.password))) {
      throw new HttpException('invalid user or password', 404);
    }

    return this.buildUserResponse(User);
  }

  async register(CreateUserDTO: CreateUserDTO) {
    const { email } = CreateUserDTO;

    let user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new UnprocessableEntityException('User already exists');
    }

    user = await this.create(CreateUserDTO);

    await this.mailService.sendMailWithQueue({
      to: user.email,
      subject: 'welcome',
      text: 'welcome to our website',
    });

    return this.buildUserResponse(user);
  }

  async create(CreateUserDTO: CreateUserDTO) {
    const user = await this.userRepository.create(CreateUserDTO);

    await this.userRepository.save(CreateUserDTO);

    return user;
  }
  async addAvatar(
    userId: number,
    imageBuffer: Buffer,
    filename: string,
  ): Promise<string> {
    const user = await this.userRepository.findOne(userId);

    if (user.avatar) {
      await this.filesService.deletePublicFile(user.avatar);
    }

    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    await this.userRepository.update(userId, {
      avatar: avatar.key,
    });

    return avatar.key;
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
