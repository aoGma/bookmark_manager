import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';
import { BookmarksIlk } from '../entities/bookmark.entity';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString({
    message: 'desc为字符串类型',
  })
  @IsOptional()
  desc?: string = '';

  @IsOptional()
  @IsEnum(BookmarksIlk)
  ilk?: BookmarksIlk;

  @IsBoolean({
    message: 'active为数字布尔类型(0,1)',
  })
  @IsOptional()
  active?: boolean;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true, message: 'id必须是数字类型' })
  tags?: number[];
}
