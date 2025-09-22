import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { multerConfig } from '../config/multer.config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePhoto', multerConfig))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: string,
  ) {
    const createUserDto: CreateUserDto = JSON.parse(body);
    if (file && createUserDto.userInfo) {
      createUserDto.userInfo.profilePhoto = file.path;
    }
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profilePhoto', multerConfig))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: string,
  ) {
    const updateUserDto: UpdateUserDto = JSON.parse(body);
    if (file && updateUserDto.userInfo) {
      updateUserDto.userInfo.profilePhoto = file.path;
    }
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('profile-photo/:filename')
  async getProfilePhoto(@Param('filename') filename, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads/profile_photos' });
  }
}