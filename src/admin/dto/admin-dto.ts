import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
