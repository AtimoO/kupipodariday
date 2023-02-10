import {
  IsNotEmpty,
  IsOptional,
  Length,
  IsUrl,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @IsOptional()
  @Length(2, 200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
