import { UserEntity } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';

@Entity('questions')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  body: string;

  @Index('question_userId_index')
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.questions)
  public user: UserEntity;

  @OneToMany(() => AnswerEntity, (answer: AnswerEntity) => answer.question)
  public answers: AnswerEntity[];
}
