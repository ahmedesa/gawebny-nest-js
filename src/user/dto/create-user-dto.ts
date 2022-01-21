import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserTypes } from '../user-type';

export class CreateUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
  
  @IsOptional()
  @IsEnum(UserTypes)
  type :number;

  @IsNotEmpty()
  email: string;
}
