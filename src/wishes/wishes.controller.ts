import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create() {
    return '';
  }

  @Get('last')
  findLastWishes() {
    return '';
  }

  @Get('top')
  findTopWishes() {
    return '';
  }

  @Get(':id')
  findOneById() {
    return '';
  }

  @Patch(':id')
  update() {
    return '';
  }

  @Delete(':id')
  remove() {
    return '';
  }

  @Post(':id/copy')
  copyWish() {
    return '';
  }
}
