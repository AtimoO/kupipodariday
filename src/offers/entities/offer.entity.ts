import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { DefaultEntity } from '../../utils/DefaultEntity';

@Entity()
export class Offer extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.offers)
  @IsNotEmpty()
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @IsNotEmpty()
  item: Wish;

  @Column({ scale: 2 })
  @IsNotEmpty()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
