import { Bookmarks } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { Tags } from '../tags/entities/tag.entity';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
export declare class BookmarksService {
    private bookmarksRepository;
    private tagRepository;
    constructor(bookmarksRepository: Repository<Bookmarks>, tagRepository: Repository<Tags>);
    create(dto: Bookmarks, tags?: number[]): Promise<string>;
    findAll(): Promise<Bookmarks[]>;
    findOne(id: number): Promise<Bookmarks>;
    update(id: number, updateBookmarkDto: UpdateBookmarkDto, tags?: number[]): Promise<string>;
    remove(id: number): string;
}
