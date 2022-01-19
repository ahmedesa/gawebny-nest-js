import { IsNotEmpty } from 'class-validator';

export class CreateAdminDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;
}
