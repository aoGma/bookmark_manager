import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './entities/tag.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private tagsRepository: Repository<Tags>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    const newTag = this.tagsRepository.create(createTagDto);
    try {
      await this.tagsRepository.manager.save(newTag);
    } catch (err) {
      // tag重复
      if (err?.errno === 1062) {
        throw new HttpException('该标签已经存在！', 400);
      }
    }
    return '添加标签成功！';
  }

  async findAll() {
    return await this.tagsRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: { id },
    });
    if (!tag) {
      throw new HttpException('找不到该标签！', 400);
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagsRepository.findOne({
      where: { id },
    });
    if (!tag) {
      throw new HttpException('找不到该标签！', 400);
    }
    Object.assign(tag, updateTagDto);
    try {
      await this.tagsRepository.save(tag);
    } catch (err) {
      if (!err) {
        throw new HttpException('更新标签错误！', 500);
      }
    }
    return '更新成功！';
  }

  async remove(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: {
        id,
      },
    });
    if (!tag) {
      throw new HttpException('找不到该标签！', 400);
    }
    try {
      await this.tagsRepository.remove(tag);
    } catch (err) {
      if (!err) {
        throw new HttpException('删除标签错误！', 500);
      }
    }
    return '删除成功！';
  }
}
