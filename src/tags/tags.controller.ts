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
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: (v) => {
          if (isNaN(parseInt(v)))
            throw new HttpException('id应该为数字！', 400);
        },
      }),
    )
    id: string,
  ) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: (v) => {
          if (isNaN(parseInt(v)))
            throw new HttpException('id应该为数字！', 400);
        },
      }),
    )
    id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: (v) => {
          if (isNaN(parseInt(v)))
            throw new HttpException('id应该为数字！', 400);
        },
      }),
    )
    id: string,
  ) {
    return this.tagsService.remove(+id);
  }
}
