import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './entities/tag.entity';
// import { UpdateTagDto } from './dto/update-tag.dto';

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
        throw new HttpException('该标签已经存在', 400);
      }
    }
    return '添加标签成功';
  }

  async findAll() {
    const tags = await this.tagsRepository.find();
    return tags;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return `This action updates a #${id} tag`;
  // }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
