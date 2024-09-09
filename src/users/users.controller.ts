import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdPipePipe } from 'src/id-pipe/id-pipe.pipe';
import { Paginate } from 'nestjs-paginate';
import { PaginateQueryValidation } from 'src/bookmarks/interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQueryValidation) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new IdPipePipe()) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new IdPipePipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new IdPipePipe()) id: number) {
    return this.usersService.remove(id);
  }
}
