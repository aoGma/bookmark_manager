import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<string>;
    findAll(): Promise<import("./entities/tag.entity").Tags[]>;
    findOne(id: string): string;
    remove(id: string): string;
}
