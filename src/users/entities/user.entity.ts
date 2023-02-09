import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { DefaultEntity } from '../../utils/DefaultEntity';

@Entity()
export class User extends DefaultEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  @Length(2, 30, { message: 'Длина должна быть от 2 до 30 символов' })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsOptional()
  @Length(2, 200, { message: 'Длина должна быть от 2 до 200 символов' })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(4, { message: 'Длина должна быть минимум 4 символа' })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  @IsEmpty()
  wishes: Array<Wish>;

  @OneToMany(() => Offer, (offer) => offer.user)
  @IsEmpty()
  offers: Array<Offer>;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  @IsEmpty()
  wishlists: Array<Wishlist>;
}
