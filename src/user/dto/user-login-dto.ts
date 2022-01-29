import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
