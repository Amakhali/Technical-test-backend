import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { userInfo, userContact, userAddress, userAcademics } = createUserDto;

    const newUser = this.userRepository.create({
      userInfo,
      userContact,
      userAddress,
      userAcademics,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['userInfo', 'userContact', 'userAddress', 'userAcademics'] });
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations: ['userInfo', 'userContact', 'userAddress', 'userAcademics'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto,
    });
    if (!user) {
        throw new Error('User not found');
    }
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}