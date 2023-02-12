import { IsOptional, IsUrl, Length, IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @Length(1, 1500)
  description: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  itemsId: Array<number>;
}
