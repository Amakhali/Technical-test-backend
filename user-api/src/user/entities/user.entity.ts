import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { UserInfo } from './user-info.entity';
import { UserContact } from './user-contact.entity';
import { UserAddress } from './user-address.entity';
import { UserAcademics } from './user-academics.entity';

@Entity('UserRecordTB')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserInfo, userInfo => userInfo.user, { cascade: true })
  userInfo: UserInfo;

  @OneToOne(() => UserContact, userContact => userContact.user, { cascade: true })
  userContact: UserContact;

  @OneToOne(() => UserAddress, userAddress => userAddress.user, { cascade: true })
  userAddress: UserAddress;

  @OneToMany(() => UserAcademics, userAcademics => userAcademics.user, { cascade: true })
  userAcademics: UserAcademics[];
}