import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { DefaultEntity } from '../../utils/DefaultEntity';

@Entity()
export class Wish extends DefaultEntity {
  @Column()
  @IsNotEmpty()
  @Length(1, 250, { message: 'Длина должна быть от 1 до 250 символов' })
  name: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column({ scale: 2 })
  @IsNotEmpty()
  @Min(1)
  price: number;

  @Column({ scale: 2, nullable: true })
  @IsOptional()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  @IsNotEmpty()
  owner: User;

  @Column()
  @IsNotEmpty()
  @Length(1, 1024, { message: 'Длина должна быть от 1 до 1024 символов' })
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  @IsEmpty()
  offers: Array<Offer>;

  @Column({ default: 0, nullable: true })
  @IsInt()
  copied: number;
}
