import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const result = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(result);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    user.name = updateUserDto.name;
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByID(id: string): Promise<User | Error> {
    const user = this.usersRepository.findOne(id);

    if (!user) {
      return new Error('User not found.');
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User | Error> {
    const user = await this.usersRepository.findOne({
      select: ['username'],
      where: {
        username,
      },
    });

    if (!user) {
      return new Error('User not found.');
    }

    return user;
  }
}
