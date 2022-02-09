import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  body: string;
}
