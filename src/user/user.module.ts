import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserAuthController } from './controllers/user-auth.controller';
import { UserRepository } from './repositories/user.repository';
import { FilesService } from 'src/shared/file/file-uplode.service';
import { FileModule } from 'src/shared/file/file.module';
import { MailModule } from 'src/shared/mail/mail.module';

@Module({
  imports: [
    ConfigModule,
    FileModule,
    MailModule,
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),

    // inject config module
    // JwtModule.registerAsync({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: process.env.JWT_EXPIRATION_TIME,
    //   },
    // }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController, UserAuthController],
  exports: [UserService],
})
export class UserModule {}
