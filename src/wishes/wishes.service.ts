import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from './../users/entities/user.entity';
import { Wish } from './entities/wish.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async create(user: User, createWishDto: CreateWishDto) {
    return await this.wishesRepository.save({
      ...createWishDto,
      owner: user,
    });
  }

  async findAll() {
    return `This action returns all wishes`;
  }

  async findOneById(id: number) {
    const wish = await this.wishesRepository.findOne({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException('Подарк не найден');
    }

    return wish;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.update(id, updateWishDto);
  }

  remove(id: number) {
    return this.wishesRepository.delete({ id });
  }
}
