import { IsNotEmpty } from 'class-validator';

export class AdminLoginDTO {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;
}
