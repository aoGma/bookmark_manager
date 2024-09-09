import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdPipePipe implements PipeTransform {
  transform(value: any): number {
    const num = /^[0-9]+$/.test(value) ? parseInt(value) : NaN;
    if (isNaN(num)) {
      throw new HttpException('id应该为数字！', 400);
    }
    return num;
  }
}
