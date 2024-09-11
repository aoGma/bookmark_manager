import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { DataSource, Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu) private menusRepository: Repository<Menu>,
    @Inject() private dataSource: DataSource,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const { parent, ...rest } = createMenuDto;
    const newMenu = this.menusRepository.create(rest);
    if (parent) {
      const parentMenu = await this.menusRepository.findOne({
        where: { id: parent },
      });
      if (parentMenu) {
        newMenu.parent = parentMenu;
      }
    }
    // !parent搜索失败是否要报错
    try {
      await this.dataSource.getTreeRepository(Menu).save(newMenu);
    } catch (err) {
      if (err?.errno === 1062) {
        throw new HttpException(`路由名称${createMenuDto.name}重复！`, 400);
      }
      throw new HttpException('添加路由失败！', 500);
    }
    return '添加菜单成功！';
  }

  async findAll() {
    return await this.dataSource.getTreeRepository(Menu).findTrees();
  }

  async findOne(id: number) {
    const menu = await this.menusRepository.findOne({ where: { id } });
    if (!menu) {
      throw new HttpException('找不到该菜单！', 400);
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menusRepository.findOne({ where: { id } });
    if (!menu) {
      throw new HttpException('找不到该菜单！', 400);
    }
    Object.assign(menu, updateMenuDto);
    try {
      await this.dataSource.getTreeRepository(Menu).save(menu);
    } catch (err) {
      if (err?.errno === 1062) {
        throw new HttpException(`路由名称${updateMenuDto.name}重复！`, 400);
      }
      throw new HttpException('更新路由失败！', 500);
    }
    return `更新路由成功！`;
  }

  async remove(id: number) {
    const menu = await this.menusRepository.findOne({
      where: {
        id,
      },
    });
    if (!menu) {
      throw new HttpException('找不到该菜单!', 400);
    }
    try {
      await this.dataSource
        .getTreeRepository(Menu)
        .remove(
          await this.dataSource.getTreeRepository(Menu).findDescendants(menu),
        );
    } catch {
      throw new HttpException('删除菜单失败！', 500);
    }
    return '删除菜单成功！';
  }
}
