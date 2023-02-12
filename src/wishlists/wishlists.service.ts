import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { User } from './../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(user: User, createWishlistDto: CreateWishlistDto) {
    const { itemsId, ...restWish } = createWishlistDto;
    const wishes = itemsId.map((id) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      ...restWish,
      owner: user,
      items: wishes,
    });
    return await this.wishlistsRepository.save(wishlist);
  }

  async findAll() {
    return await this.wishlistsRepository.find({
      relations: ['items', 'owner'],
    });
  }

  async findOneById(id: number) {
    return await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    // const { itemsId, ...restWish } = updateWishlistDto;
    delete updateWishlistDto.itemsId;
    return await this.wishlistsRepository.update(id, updateWishlistDto);
  }

  async remove(id: number) {
    return await this.wishlistsRepository.delete(id);
  }
}
