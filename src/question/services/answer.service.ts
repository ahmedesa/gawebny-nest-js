import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { AnswerRepository } from '../repositories/answer.repository';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerRepository)
    private AnswerRepository: AnswerRepository,
    @InjectRepository(QuestionRepository)
    private QuestionRepository: QuestionRepository,
  ) {}

  async create(createAnswerDto: CreateAnswerDto, user: UserEntity) {
    const question = await this.QuestionRepository.findOne(
      createAnswerDto.questionId,
    );

    const answer = await this.AnswerRepository.create({
      body: createAnswerDto.body,
      user: user,
      question: question,
    });

    await answer.save();

    return answer;
  }

  async findAll(page?: number, per_page?: number) {
    let skip = (page - 1) * per_page;

    const [items, count] = await this.AnswerRepository.findAndCount({
      relations: ['user'],
      order: {
        id: 'ASC',
      },
      skip: skip,
      take: per_page,
    });

    return { items, count };
  }

  async findOne(id: number) {
    const answer = await this.AnswerRepository.findOne(id, {
      relations: ['user'],
    });
    if (!answer) {
      throw new HttpException('not found', 404);
    }

    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.AnswerRepository.update(id, {
      body: updateAnswerDto.body,
    });

    return answer;
  }

  async remove(id: number) {
    const answer = await this.AnswerRepository.findOne(id);

    if (!answer) {
      throw new HttpException('not found', 404);
    }

    this.AnswerRepository.remove(answer);
  }
}
