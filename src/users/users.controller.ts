import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const currentPassword = createUserDto.password;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(currentPassword, saltOrRounds);

    createUserDto.password = hashedPassword;

    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: string): Promise<User | string> {
    const user = await this.usersService.findOne(id);

    if (user instanceof Error) {
      return user.message;
    }

    return user;
  }

  @Patch(':id')
  async update(
    @Param() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | string> {
    const user = this.usersService.findOne(id);

    if (user instanceof Error) {
      return user.message;
    }

    const currentPassword = updateUserDto.password;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(currentPassword, saltOrRounds);

    updateUserDto.password = hashedPassword;

    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param() id: string): Promise<DeleteResult | string> {
    const user = await this.usersService.findOne(id);

    if (user instanceof Error) {
      return user.message;
    }

    return await this.usersService.delete(id);
  }
}
