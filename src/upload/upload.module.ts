import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmarks } from 'src/bookmarks/entities/bookmark.entity';
import { Tags } from 'src/tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmarks, Tags])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
