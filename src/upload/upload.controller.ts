import {
  Controller,
  FileTypeValidator,
  HttpException,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: 'text/html' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('没有上传文件!', 400);
    }
    if (file.size === 0) {
      throw new HttpException('文件不能为空!', 400);
    }
    const fileContent = file.buffer.toString('utf8');
    if (!fileContent.startsWith('<!DOCTYPE NETSCAPE-Bookmark-file-1>')) {
      throw new HttpException('上传的文件不是Chrome书签文件!', 400);
    }
    return this.uploadService.upload(file);
  }
}
