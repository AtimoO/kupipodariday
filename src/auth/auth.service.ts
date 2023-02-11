import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from './../users/entities/user.entity';
import { compare } from '../utils/helpersBcrypt';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  login(user: User) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validate(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return compare(password, user);
  }
}
