import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('Admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  @Exclude()
  password: string;

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
