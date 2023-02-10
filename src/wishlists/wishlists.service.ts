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

  create(user: User, createWishlistDto: CreateWishlistDto) {
    const { itemsId, ...restWish } = createWishlistDto;
    const wishes = itemsId.map((id) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      ...restWish,
      owner: user,
      items: wishes,
    });
    return this.wishlistsRepository.save(wishlist);
  }

  findAll() {
    return this.wishlistsRepository.find({ relations: ['items', 'owner'] });
  }

  findOneById(id: number) {
    return this.wishlistsRepository.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });
  }

  async update(id: number, user: User, updateWishlistDto: UpdateWishlistDto) {
    const { itemsId, ...restWish } = updateWishlistDto;
    const wishlist = await this.findOneById(id);
    await this.wishlistsRepository.update(id, restWish);
    wishlist.items = itemsId.map((id: number) => ({ id } as Wish));
    return await this.wishlistsRepository.save({
      ...restWish,
      owner: user,
      items: wishlist.items,
    });
  }

  remove(id: number) {
    return this.wishlistsRepository.delete(id);
  }
}
