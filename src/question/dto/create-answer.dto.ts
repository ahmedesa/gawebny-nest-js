import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  questionId: number;
}
