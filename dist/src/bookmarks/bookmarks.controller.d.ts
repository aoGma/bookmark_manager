import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmarks } from './entities/bookmark.entity';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
export declare class BookmarksController {
    private readonly bookmarksService;
    constructor(bookmarksService: BookmarksService);
    create(createBookmarkDto: CreateBookmarkDto): Promise<string>;
    findAll(): Promise<Bookmarks[]>;
    findOne(id: string): Promise<Bookmarks>;
    update(id: string, updateBookmarkDto: UpdateBookmarkDto): Promise<string>;
    remove(id: string): string;
}
