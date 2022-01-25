import { HttpException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { In } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionSearchResponse } from '../interfaces/question-search-response';
import { QuestionSearchBody } from '../interfaces/question-search.dto';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionService {
  elastic_index = 'questions';

  constructor(
    @InjectRepository(QuestionRepository)
    private QuestionRepository: QuestionRepository,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, user: UserEntity) {
    const question = await this.QuestionRepository.create({
      ...createQuestionDto,
      user: user,
    });

    await question.save();

    await this.indexQuestion(question);

    return question;
  }

  async findAll(page?: number, per_page?: number) {
    let skip = (page - 1) * per_page;

    const [items, count] = await this.QuestionRepository.findAndCount({
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

  async indexQuestion(question: QuestionEntity) {
    return this.elasticsearchService.index<
      QuestionSearchResponse,
      QuestionSearchBody
    >({
      index: this.elastic_index,
      body: {
        id: question.id,
        title: question.title,
        body: question.body,
        userId: question.user.id,
      },
    });
  }

  async searchForPosts(text: string) {
    const results = await this.search(text);

    const ids = results.map((result) => result.id);

    if (!ids.length) {
      return [];
    }

    return this.QuestionRepository.find({
      where: { id: In(ids) },
    });
  }

  async search(text: string) {
    const { body } =
      await this.elasticsearchService.search<QuestionSearchResponse>({
        index: this.elastic_index,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ['body', 'content'],
            },
          },
        },
      });

    const hits = body.hits.hits;

    return hits.map((item) => item._source);
  }
}
