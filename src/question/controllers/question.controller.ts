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
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import RoleGuard from 'src/user/role.guard';
import { UserTypes } from 'src/user/user-type';
import { JWTAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(RoleGuard(UserTypes.User))
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() request) { 
    return this.questionService.create(createQuestionDto, request.user);
  }

  @Get()
  @UseGuards(RoleGuard(UserTypes.ADMIN))
  findAll() {
    return this.questionService.findAll();
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