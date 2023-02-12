import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async findAll() {
    return await this.wishlistsService.findAll();
  }

  @Post()
  async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return await this.wishlistsService.create(req.user, createWishlistDto);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    const wishlist = await this.wishlistsService.findOneById(id);

    if (!wishlist) {
      throw new NotFoundException('Список подарков не найден');
    }

    return wishlist;
  }

  @Patch(':id')
  public async updateWishlist(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.wishlistsService.findOneById(id);

    if (!wishlist) {
      throw new NotFoundException('Список подарков не найден');
    }
    if (wishlist.owner.id === req.user.id) {
      await this.wishlistsService.update(id, updateWishlistDto);
      return this.wishlistsService.findOneById(id);
    } else {
      throw new ForbiddenException({
        success: false,
        message: 'Вы не можете менять чужие списки',
      });
    }
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const wishlist = await this.wishlistsService.findOneById(id);

    if (!wishlist) {
      throw new NotFoundException('Список не найден');
    } else if (wishlist.owner.id === req.user.id) {
      await this.wishlistsService.remove(id);
      return { success: true, message: 'Список удален' };
    } else {
      throw new ForbiddenException({
        success: false,
        message: 'Вы не можете удалять чужие списки',
      });
    }
  }
}
