import { IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsString({
    message: 'desc为字符串类型',
  })
  @IsOptional()
  desc?: string;
}
