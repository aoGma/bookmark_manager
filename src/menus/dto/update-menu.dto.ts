import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(
  OmitType(CreateMenuDto, ['parent'] as const),
) {}
