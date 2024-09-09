import {
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateQueryValidation {
  @IsOptional()
  @IsNumber({}, { message: 'page应为数字类型！' })
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber({}, { message: 'limit应为数字类型！' })
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString({ each: true, message: 'sortBy应为字符串或字符串数组类型！' })
  @Type(() => Array)
  sortBy?: [string, string][];

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'searchBy应为字符串或字符串数组类型！' })
  searchBy?: string[];

  @IsOptional()
  @IsString({ message: 'search应为字符串类型！' })
  search?: string;

  @IsOptional()
  @IsObject()
  filter?: {
    [column: string]: string | string[];
  };

  @IsOptional()
  @Type(() => Array)
  @IsString({ each: true, message: 'select应为字符串或字符串数组类型！' })
  select?: string[];

  @IsString()
  @IsOptional()
  path: string;
}
