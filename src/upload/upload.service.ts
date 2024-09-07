import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmarks } from 'src/bookmarks/entities/bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Bookmarks)
    private bookmarksRepository: Repository<Bookmarks>,
  ) {}
  async upload(file: Express.Multer.File) {
    const fileStr = file.buffer.toString();
    const handle = load(fileStr);
    const links = handle('a')
      .map(function (i, el) {
        const _this = handle(el);
        return {
          name: _this.text(),
          url: _this.attr('href'),
        };
      })
      .get();
    const entities = this.bookmarksRepository.create(links);
    const insertedEntities = await this.bookmarksRepository.save(entities);
    const successCount = insertedEntities.length;
    return `成功插入${successCount}条书签`;
  }
}
