import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  email: string;
}
