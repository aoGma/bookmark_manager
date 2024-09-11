import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Roles } from 'src/roles/entities/role.entity';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { role, ...rest } = createUserDto;
    let newRole: Roles;
    if (newRole) {
      newRole = await this.rolesRepository.findOne({
        where: { id: role },
      });
      if (!newRole) {
        throw new HttpException(`role: ${role} 不存在！`, 400);
      }
    }
    const newUser = this.usersRepository.create(
      role
        ? {
            ...rest,
            role: newRole,
          }
        : rest,
    );
    try {
      await this.usersRepository.manager.save(newUser);
    } catch (err) {
      // Url重复
      if (err?.errno === 1062) {
        throw new HttpException('该用户已存在！', 400);
      }
    }
    return '添加用户成功！';
  }

  async findAll(query: PaginateQuery) {
    const config: PaginateConfig<Users> = {
      relations: ['role'],
      sortableColumns: [
        'id',
        'username',
        'create_timestamp',
        'update_timestamp',
      ],
      filterableColumns: {
        active: [FilterOperator.IN],
        roleName: [FilterOperator.IN],
      },
      select: [
        'id',
        'username',
        'role.roleName',
        'active',
        'create_timestamp',
        'update_timestamp',
      ],
    };
    const queryBuilder = this.usersRepository
      .createQueryBuilder('users')
      .leftJoin('users.role', 'role');
    const res = await paginate(query, queryBuilder, config);
    // 如果你不希望返回字段带有前缀，可以手动映射它们
    res.data = res.data.map((item) => {
      const { role, ...rest } = item;
      return Object.assign(rest, {
        roleName: role ? role.roleName : null,
      }) as unknown as Users;
    });
    return res;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('找不到该用户！', 400);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('找不到该用户，无法修改！', 400);
    }
    const { role, ...rest } = updateUserDto;
    const newRole = await this.rolesRepository.findOne({
      where: { id: role },
    });
    if (!newRole) {
      throw new HttpException(`role: ${role} 不存在！`, 400);
    }
    Object.assign(user, rest, newRole ? { role: newRole } : {});
    try {
      await this.usersRepository.manager.save(user);
    } catch (err) {
      // 用户名重复
      if (err?.errno === 1062) {
        throw new HttpException('要更改的目标用户名已存在！', 400);
      }
      throw new HttpException('更新用户信息失败！', 500);
    }
    return '更新用户信息成功！';
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('找不到该用户!', 400);
    }
    try {
      await this.usersRepository.remove(user);
    } catch {
      throw new HttpException('删除用户失败！', 500);
    }
    return '删除用户成功！';
  }
}
