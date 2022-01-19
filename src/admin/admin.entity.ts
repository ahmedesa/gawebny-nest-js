import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Exclude()
  password: string;

  @Column('text')
  username: string;

  @Column({ unique: true })
  email: string;
}
