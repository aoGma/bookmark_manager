import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: '角色名称不能为空！' })
  roleName: string;
}
