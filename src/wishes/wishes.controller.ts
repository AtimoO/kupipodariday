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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() createWishDto: CreateWishDto) {
    return await this.wishesService.create(req.user, createWishDto);
  }

  @Get('last')
  async findLastWishes() {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async findTopWishes() {
    return await this.wishesService.findTop();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    const wish = await this.wishesService.findOneById(id);

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

    return wish;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const wish = await this.wishesService.findOneById(id);

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    } else if (wish.owner.id === req.user.id) {
      await this.wishesService.update(id, updateWishDto);
      return await this.wishesService.findOneById(id);
    } else {
      throw new ForbiddenException({
        message: 'Вы не можете менять чужие подарки',
      });
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const wish = await this.wishesService.findOneById(id);

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    } else if (wish.owner.id === req.user.id) {
      await this.wishesService.remove(id);
      return { success: true, message: 'Подарок удален' };
    } else {
      throw new ForbiddenException({
        success: false,
        message: 'Вы не можете удалять чужие подарки',
      });
    }
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Req() req, @Param('id') id: number) {
    const wish = await this.wishesService.findOneById(id);

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

    await this.wishesService.update(id, { copied: ++wish.copied });
    const { name, link, image, price, description } = wish;
    if (wish.owner.id !== req.user.id) {
      return await this.wishesService.create(req.user, {
        name,
        link,
        image,
        price,
        description,
      });
    }
    return { success: false, message: 'Скопировать не получилось' };
  }
}
