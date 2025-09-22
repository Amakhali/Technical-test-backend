import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('UserAcademicsTB')
export class UserAcademics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schoolName: string;

  @ManyToOne(() => User, user => user.userAcademics)
  user: User;
}
