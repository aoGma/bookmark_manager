import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmarks } from './entities/bookmark.entity';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { IdPipePipe } from 'src/id-pipe/id-pipe.pipe';
import { Paginate } from 'nestjs-paginate';
import { PaginateQueryValidation } from './interface';

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
  findAll(@Paginate() query: PaginateQueryValidation) {
    return this.bookmarksService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', new IdPipePipe())
    id: number,
  ) {
    return this.bookmarksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new IdPipePipe())
    id: number,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    const { tags = [] } = updateBookmarkDto;
    return this.bookmarksService.update(id, updateBookmarkDto, tags);
  }

  @Delete(':id')
  remove(
    @Param('id', new IdPipePipe())
    id: number,
  ) {
    return this.bookmarksService.remove(id);
  }
}
