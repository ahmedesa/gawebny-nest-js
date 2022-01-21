import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAdminDTO {
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsNotEmpty()
  @IsOptional()
  email: string;
}
