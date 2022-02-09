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
    private questionRepository: QuestionRepository,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, user: UserEntity) {
    const question = await this.questionRepository.create({
      ...createQuestionDto,
      user: user,
    });

    await question.save();

    await this.indexQuestion(question);

    return question;
  }

  async findAll(page?: number, per_page?: number) {
    const skip = (page - 1) * per_page;

    const [items, count] = await this.questionRepository.findAndCount({
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
    const question = await this.questionRepository.findOne(id, {
      relations: ['user'],
    });
    if (!question) {
      throw new HttpException('invalid user or password', 404);
    }

    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.update(
      id,
      updateQuestionDto,
    );

    if (!question) {
      throw new HttpException('invalid user or password', 404);
    }

    await this.updateIndex(question);

    return question;
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOne(id);

    if (!question) {
      throw new HttpException('invalid user or password', 404);
    }

    await this.removeIndex(id);

    await this.questionRepository.remove(question);
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

  async searchForQuestions(text: string, page?: number, per_page?: number) {
    const skip = (page - 1) * per_page;

    const results = await this.search(text);

    console.log(results);

    const ids = results.map((result) => result.id);

    if (!ids.length) {
      return [];
    }

    const [items, count] = await this.questionRepository.findAndCount({
      where: { id: In(ids) },
      relations: ['user'],
      order: {
        id: 'ASC',
      },
      skip: skip,
      take: per_page,
    });

    return { items, count };
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

  async updateIndex(question: QuestionEntity | any) {
    const newBody: QuestionSearchBody = {
      id: question.id,
      title: question.title,
      body: question.body,
      userId: question.user.id,
    };

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.elastic_index,
      body: {
        query: {
          match: {
            id: question.id,
          },
        },
        script: {
          inline: script,
        },
      },
    });
  }

  async removeIndex(QuestionId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.elastic_index,
      body: {
        query: {
          match: {
            id: QuestionId,
          },
        },
      },
    });
  }
}
