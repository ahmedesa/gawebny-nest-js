import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserTypes } from './user-type';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { Transform } from 'class-transformer';
import { AnswerEntity } from 'src/question/entities/answer.entity';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Entity('users')
export class UserEntity extends BaseEntity {
  
  @ApiProperty({ id: 1, description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column('text')
  username: string;

  @Column({ unique: true })
  email: string;

  @Column('integer')
  @Column({
    type: 'enum',
    enum: UserTypes,
    default: UserTypes.User,
  })
  type: number;

  @Column({ nullable: true })
  @Transform(({ value }) =>
    value ? `${process.env.AWS_PUBLIC_BUCKET_URL}/${value}` : null,
  )
  avatar?: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date

  @OneToMany(() => QuestionEntity, (question: QuestionEntity) => question.user)
  public questions: QuestionEntity[];

  @OneToMany(() => AnswerEntity, (answer: AnswerEntity) => answer.user)
  public answers: AnswerEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
