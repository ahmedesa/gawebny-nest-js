import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  questionId: number;
}
