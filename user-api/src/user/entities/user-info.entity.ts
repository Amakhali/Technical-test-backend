import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('UserInfoTB')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profilePhoto: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dob: Date;

  @Column()
  occupation: string;

  @Column()
  gender: string;

  @OneToOne(() => User, user => user.userInfo)
  @JoinColumn()
  user: User;
}
