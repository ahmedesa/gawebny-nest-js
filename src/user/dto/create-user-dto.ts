import { IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from 'src/utils/app.utils';
import { UserTypes } from '../user-type';

export class CreateUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(PASSWORD_RULE, { message: PASSWORD_RULE_MESSAGE })
  password: string;

  @IsOptional()
  @IsEnum(UserTypes)
  type: number;

  @IsNotEmpty()
  email: string;
}
