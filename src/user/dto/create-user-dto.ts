import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from 'src/utils/app.utils';
import { UserTypes } from '../user-type';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(PASSWORD_RULE, { message: PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({ enum: UserTypes })
  @IsOptional()
  @IsEnum(UserTypes)
  type: number;

  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
