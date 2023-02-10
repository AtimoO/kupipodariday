import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from '../utils/helpersBcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashPassword = await hash(createUserDto.password, 10);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
      });
      const savedUser = await this.userRepository.save(newUser);
      console.log('savedUser', savedUser);
      return savedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
