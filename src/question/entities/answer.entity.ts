import { UserEntity } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('answers')
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  body: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;

  @Index('answer_userId_index')
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.answers)
  public user: UserEntity;

  @Index('question_answerId_index')
  @ManyToOne(
    () => QuestionEntity,
    (question: QuestionEntity) => question.answers,
  )
  public question: QuestionEntity;
}
