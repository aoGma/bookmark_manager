import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { IdPipePipe } from 'src/id-pipe/id-pipe.pipe';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new IdPipePipe()) id: number) {
    return this.menusService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new IdPipePipe()) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id', new IdPipePipe()) id: number) {
    return this.menusService.remove(id);
  }
}
