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
    let successCount = 0;
    let duplicateCount = 0;
    let errorCount = 0;
    await Promise.all(
      entities.map(async (entity) => {
        try {
          await this.bookmarksRepository.save(entity);
          successCount++;
        } catch (err) {
          if (err.errno === 1062) {
            duplicateCount++;
            errorCount++;
          } else {
            errorCount++;
          }
        }
      }),
    );
    return {
      successCount,
      errorCount,
      duplicateCount,
    };
  }
}
