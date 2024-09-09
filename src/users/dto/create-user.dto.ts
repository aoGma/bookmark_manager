import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: '用户名称不能为空！',
  })
  username: string;

  @IsString()
  @IsNotEmpty({
    message: '用户密码不能为空！',
  })
  password: string;

  @IsNumber({}, { message: '角色Id应为数字' })
  @IsOptional()
  role: number;
}
