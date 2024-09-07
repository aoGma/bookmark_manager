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
  // TODO 限制只能上传Chrome书签文件<html>类型
  create(
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory() {
          throw new HttpException('上传文件必须是Chrome导出的html!', 400);
        },
        validators: [new FileTypeValidator({ fileType: 'text/html' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.upload(file);
  }
}
