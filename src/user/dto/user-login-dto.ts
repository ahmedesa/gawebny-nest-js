import { IsNotEmpty } from 'class-validator';

export class UserLoginDTO {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;
}
