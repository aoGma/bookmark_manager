import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmarks } from './entities/bookmark.entity';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    const { tags, ...rest } = createBookmarkDto;
    // TODO <as> 是否有更好的方法
    return this.bookmarksService.create(rest as Bookmarks, tags);
  }

  @Get()
  findAll() {
    return this.bookmarksService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: (v) => {
          if (isNaN(parseInt(v))) throw new HttpException('id应该为数字', 400);
        },
      }),
    )
    id: string,
  ) {
    return this.bookmarksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: (v) => {
          if (isNaN(parseInt(v))) throw new HttpException('id应该为数字', 400);
        },
      }),
    )
    id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    const { tags = [] } = updateBookmarkDto;
    return this.bookmarksService.update(+id, updateBookmarkDto, tags);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarksService.remove(+id);
  }
}
