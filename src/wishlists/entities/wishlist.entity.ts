import {
  IsNotEmpty,
  IsUrl,
  Length,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';
import { DefaultEntity } from '../../utils/DefaultEntity';

@Entity()
export class Wishlist extends DefaultEntity {
  @Column()
  @IsNotEmpty()
  @Length(1, 250, { message: 'Длина должна быть от 1 до 250 символов' })
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(1500, { message: 'Длина должна до 1500 символов' })
  description: string;

  @Column()
  @IsOptional()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  @IsOptional()
  items: Array<Wish>;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
