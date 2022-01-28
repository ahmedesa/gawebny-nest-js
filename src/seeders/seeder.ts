import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { UserService } from 'src/user/services/user.service';
import { UserTypes } from 'src/user/user-type';
import { CreateUserDTO } from '../user/dto/create-user-dto';
import * as faker from '@faker-js/faker';
import { QuestionService } from 'src/question/services/question.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly userService: UserService,
    private readonly questionService: QuestionService,
  ) {}
  async seed() {
    await this.seedUsers();
    await this.seedQuestions();
  }

  async seedUsers() {
    let user: CreateUserDTO = {
      username: 'user',
      password: 'password',
      email: 'user@user.com',
      type: UserTypes.User,
    };

    let admin: CreateUserDTO = {
      username: 'admin',
      password: 'password',
      email: 'admin@admin.com',
      type: UserTypes.ADMIN,
    };

    this.userService.create(user);
    this.userService.create(admin);

    console.log('seed the users');
  }

  async seedQuestions() {
    const user: any = await this.userService.findFirst({
      type: UserTypes.User,
    });

    for (let i = 0; i <= 5; i++) {
      await this.questionService.create(
        {
          title: faker.default.name.firstName(),
          body: faker.default.name.title(),
        },
        user,
      );
    }

    console.log('seed the questions');
  }
}
