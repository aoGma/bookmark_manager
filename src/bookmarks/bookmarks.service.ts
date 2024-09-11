import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmarks } from './entities/bookmark.entity';
import { In, Repository } from 'typeorm';
import { Tags } from '../tags/entities/tag.entity';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmarks)
    private bookmarksRepository: Repository<Bookmarks>,
    @InjectRepository(Tags)
    private tagRepository: Repository<Tags>,
  ) {}
  async create(dto: Bookmarks, tags?: number[]) {
    let tagsEntity: Tags[] = [];
    if (tags?.length) {
      tagsEntity = await this.tagRepository.findBy({
        id: In(tags),
      });
      if (tagsEntity.length !== tags.length) {
        const existingTagIds = tagsEntity.map((tag) => tag.id);
        const missingTagIds = tags.filter((id) => !existingTagIds.includes(id));
        throw new HttpException(
          `tags: ${missingTagIds.join(', ')} 不存在！`,
          400,
        );
      }
    }
    const newBookmark = this.bookmarksRepository.create({
      ...dto,
      tags: tagsEntity,
    });
    try {
      await this.bookmarksRepository.manager.save(newBookmark);
    } catch (err) {
      // Url重复
      if (err?.errno === 1062) {
        throw new HttpException('该条书签url已存在！', 400);
      }
    }
    return '添加书签成功！';
  }

  async findAll(query: PaginateQuery) {
    const config: PaginateConfig<Bookmarks> = {
      relations: ['tags'],
      sortableColumns: [
        'id',
        'name',
        'clicks',
        'tags.name',
        'create_timestamp',
        'update_timestamp',
      ],
      filterableColumns: {
        active: [FilterOperator.EQ],
        ilk: [FilterOperator.IN],
      },
    };
    const queryBuilder = this.bookmarksRepository
      .createQueryBuilder('bookmarks')
      .leftJoinAndSelect('bookmarks.tags', 'tag');
    return await paginate(query, queryBuilder, config);
  }

  async findOne(id: number) {
    const bookmark = await this.bookmarksRepository
      .createQueryBuilder('bookmarks')
      .leftJoinAndSelect('bookmarks.tags', 'tag')
      .where({ id })
      .getOne();
    if (!bookmark) {
      throw new HttpException('找不到该书签！', 400);
    }
    return bookmark;
  }

  async update(
    id: number,
    updateBookmarkDto: UpdateBookmarkDto,
    tags?: number[],
  ) {
    let tagsEntity: Tags[] = [];
    if (tags?.length) {
      tagsEntity = await this.tagRepository.findBy({
        id: In(tags),
      });
      if (tagsEntity.length !== tags.length) {
        const existingTagIds = tagsEntity.map((tag) => tag.id);
        const missingTagIds = tags.filter((id) => !existingTagIds.includes(id));
        throw new HttpException(
          `tags: ${missingTagIds.join(', ')}不存在！`,
          400,
        );
      }
    }
    const bookmark = await this.bookmarksRepository.findOne({
      where: {
        id,
      },
    });
    if (!bookmark) {
      throw new HttpException('找不到该书签，无法修改！', 400);
    }
    Object.assign(bookmark, updateBookmarkDto);
    if (tagsEntity.length) {
      Object.assign(bookmark, { tags: tagsEntity });
    }
    try {
      await this.bookmarksRepository.save(bookmark);
    } catch (err) {
      if (err?.errno === 1062) {
        throw new HttpException('要更改的目标书签已存在！', 400);
      }
      throw new HttpException('更新书签错误！', 500);
    }
    return '更新书签成功！';
  }

  async remove(id: number) {
    const bookmark = await this.bookmarksRepository.findOne({
      where: {
        id,
      },
    });
    if (!bookmark) {
      throw new HttpException('找不到该书签!', 400);
    }
    try {
      await this.bookmarksRepository.remove(bookmark);
    } catch {
      throw new HttpException('删除书签失败！', 500);
    }
    return '删除书签成功！';
  }
}
