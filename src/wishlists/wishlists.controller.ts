import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll() {
    return '';
  }

  @Post()
  create() {
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
}
