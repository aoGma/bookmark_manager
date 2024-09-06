import { CreateTagDto } from './dto/create-tag.dto';
import { Repository } from 'typeorm';
import { Tags } from './entities/tag.entity';
export declare class TagsService {
    private tagsRepository;
    constructor(tagsRepository: Repository<Tags>);
    create(createTagDto: CreateTagDto): Promise<string>;
    findAll(): Promise<Tags[]>;
    findOne(id: number): string;
    remove(id: number): string;
}
