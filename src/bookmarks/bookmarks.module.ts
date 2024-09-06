import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmarks } from './entities/bookmark.entity';
import { Tags } from '../tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmarks, Tags])],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}
