import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString({ message: 'name为字符串类型！' })
  name: string;

  @IsString({ message: 'menuName为字符串类型！' })
  menuName: string;

  @IsString({ message: 'path为字符串类型！' })
  path: string;

  @IsString({ message: 'component为字符串类型！' })
  component: string;

  @IsString({ message: 'redirect为字符串类型！' })
  @IsOptional()
  redirect?: string;

  @IsNumber({}, { message: 'parent为字符串类型！' })
  @IsOptional()
  parent?: number;
}
