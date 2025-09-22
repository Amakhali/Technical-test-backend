import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('UserContactTB')
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  fax?: string;

  @Column({ nullable: true })
  linkedinUrl?: string;

  @OneToOne(() => User, user => user.userContact)
  @JoinColumn()
  user: User;
}
