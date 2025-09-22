import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademics } from './entities/user-academics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo, UserContact, UserAddress, UserAcademics])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}