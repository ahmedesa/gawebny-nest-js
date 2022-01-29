import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import RoleGuard from 'src/user/role.guard';
import { UserTypes } from 'src/user/user-type';
import { JWTAuthGuard } from 'src/user/jwt-auth.guard';
import { PaginationParams } from 'src/shared/pagination-params';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Question')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JWTAuthGuard)
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() request) {
    return this.questionService.create(createQuestionDto, request.user);
  }

  @Get()
  findAll(
    @Query() { page, per_page }: PaginationParams,
    @Query('search') search: string,
  ) {
    if (search) {
      return this.questionService.searchForQuestions(search, page, per_page);
    }

    return this.questionService.findAll(page, per_page);
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(RoleGuard(UserTypes.ADMIN))
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
