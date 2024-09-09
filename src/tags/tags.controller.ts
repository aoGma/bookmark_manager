import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { IdPipePipe } from 'src/id-pipe/id-pipe.pipe';
import { PaginateQueryValidation } from 'src/bookmarks/interface';
import { Paginate } from 'nestjs-paginate';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQueryValidation) {
    return this.tagsService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', new IdPipePipe())
    id: number,
  ) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new IdPipePipe())
    id: number,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new IdPipePipe())
    id: number,
  ) {
    return this.tagsService.remove(id);
  }
}
