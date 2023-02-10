import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsNotEmpty()
  itemId: number;
}
