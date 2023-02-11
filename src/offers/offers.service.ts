import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { User } from './../users/entities/user.entity';
import { Offer } from './entities/offer.entity';
import { WishesService } from '../wishes/wishes.service';
// import { UsersService } from '../users/users.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService, //private readonly usersService: UsersService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto): Promise<Offer> {
    const wish = await this.wishesService.findOneById(createOfferDto.itemId);

    if (user.id === wish.owner.id) {
      throw new BadRequestException('Нельзя скидываться себе на подарок');
    } else if (wish.raised + createOfferDto.amount > wish.price) {
      throw new BadRequestException('Большой взнос, уменьшите его');
    }

    await this.wishesService.update(wish.id, {
      raised: wish.raised + createOfferDto.amount,
    });
    const offer = this.offersRepository.create({
      ...createOfferDto,
      user,
      item: wish,
    });

    return await this.offersRepository.save(offer);
  }

  findAll(): Promise<Array<Offer>> {
    return this.offersRepository.find({ relations: ['item', 'user'] });
  }

  findOneById(id: number): Promise<Offer> {
    return this.offersRepository.findOne({
      where: { id },
      relations: ['item', 'user'],
    });
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return this.offersRepository.update(id, updateOfferDto);
  }

  remove(id: number) {
    return this.offersRepository.delete(id);
  }
}
