import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { WishesService } from '../wishes/wishes.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { hash } from '../utils/helpersBcrypt';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  async getMyProfile(@Req() req) {
    return this.usersService.findOneById(req.user.id);
  }

  @Patch('me')
  async updateMyProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = { ...req.user, ...updateUserDto };

    const hashPassword = updateUserDto.password
      ? await hash(updateUserDto.password, 10)
      : user.password;

    await this.usersService.update(req.user.id, {
      ...user,
      password: hashPassword,
    });

    return await this.usersService.findOneById(user.id);
  }

  @Get('me/wishes')
  async getMyWishes(@Req() req) {
    return await this.wishesService.findWishesByOwner(req.user.id);
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  @Get(':username/wishes')
  async findWishesByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return await this.wishesService.findWishesByOwner(user.id);
  }

  @Post('find')
  async findMany(@Body() user) {
    return await this.usersService.findMany(user);
  }
}

// TODO: Учитывать регистр username?
