import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const newRole = this.rolesRepository.create(createRoleDto);
    try {
      await this.rolesRepository.manager.save(newRole);
    } catch (err) {
      // Url重复
      if (err?.errno === 1062) {
        throw new HttpException('该角色已存在！', 400);
      }
    }
    return '添加角色成功！';
  }

  async findAll() {
    return this.rolesRepository.find();
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOne({
      where: {
        id,
      },
    });
    if (!role) {
      throw new HttpException('找不到该角色！', 400);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new HttpException('该角色不存在！', 400);
    }
    Object.assign(role, updateRoleDto);
    try {
      await this.rolesRepository.save(role);
    } catch (err) {
      if (err?.errno === 1062) {
        throw new HttpException('要更改的目标角色已存在！', 400);
      } else if (!err) {
        throw new HttpException('更新角色错误！', 500);
      }
    }
    return '更新角色成功！';
  }

  async remove(id: number) {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new HttpException('找不到该角色!', 400);
    }
    try {
      await this.rolesRepository.remove(role);
    } catch (err) {
      if (!err) {
        throw new HttpException('删除角色错误！', 500);
      }
    }
    return '删除角色成功！';
  }
}
