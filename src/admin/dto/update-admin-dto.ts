import { IsNotEmpty } from 'class-validator';

export class UpdateAdminDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;
}
