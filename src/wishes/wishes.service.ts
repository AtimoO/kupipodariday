import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from './../users/entities/user.entity';
import { Wish } from './entities/wish.entity';

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

  async findOneById(id: number) {
    const wish = await this.wishesRepository.findOne({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

    return wish;
  }

  async findWishesByOwner(id: number) {
    return this.wishesRepository.find({
      where: { owner: { id } },
      relations: ['offers', 'owner'],
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    return await this.wishesRepository.update(id, updateWishDto);
  }

  async remove(id: number) {
    return await this.wishesRepository.delete({ id });
  }

  async findTop() {
    return await this.wishesRepository.find({
      take: 10,
      order: { copied: 'DESC' },
    });
  }

  async findLast() {
    return await this.wishesRepository.find({
      take: 40,
      order: { createdAt: 'DESC' },
    });
  }
}
