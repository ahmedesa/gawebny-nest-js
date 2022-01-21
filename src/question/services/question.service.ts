import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private QuestionRepository: QuestionRepository,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, user: UserEntity) {
    const question = await this.QuestionRepository.create({
      ...createQuestionDto,
      user: user,
    });

    await question.save();

    return question;
  }

  async findAll() {
    return await this.QuestionRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const question = await this.QuestionRepository.findOne(id, {
      relations: ['user'],
    });
    if (!question) {
      throw new HttpException('invalid user or password', 404);
    }

    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.QuestionRepository.update(
      id,
      updateQuestionDto,
    );

    if (!question) {
      throw new HttpException('invalid user or password', 404);
    }

    return question;
  }

  async remove(id: number) {
    const question = await this.QuestionRepository.findOne(id);

    if (!question) {
      throw new HttpException('invalid user or password', 404);
    }

    this.QuestionRepository.remove(question);
  }
}