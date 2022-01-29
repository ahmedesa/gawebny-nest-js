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

  @ApiProperty({ required: false, enum: UserTypes })
  @IsOptional()
  @IsEnum(UserTypes)
  type: number;

  @ApiProperty({
    required: true,
    example: 'updated@demo.com',
  })
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'Email must be a type of email',
  })
  @IsNotEmpty()
  email: string;
}
