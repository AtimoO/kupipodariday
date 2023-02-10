import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMyProfile() {
    return '';
  }

  @Patch('me')
  async updateMyProfile() {
    return '';
  }

  @Get('me/wishes')
  async getMyWishes() {
    return '';
  }

  @Get(':username')
  async findByUsername() {
    return '';
  }

  @Get(':username/wishes')
  async findWishesByUsername() {
    return '';
  }

  @Post('find')
  async findMany() {
    return '';
  }
}
