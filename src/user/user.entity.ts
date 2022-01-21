import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserTypes } from './user-type';
import { QuestionEntity } from 'src/question/entities/question.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

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

  @OneToMany(() => QuestionEntity, (question: QuestionEntity) => question.user)
  public questions: QuestionEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
