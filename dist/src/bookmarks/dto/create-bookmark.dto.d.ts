import { BookmarksIlk } from '../entities/bookmark.entity';
export declare class CreateBookmarkDto {
    name: string;
    url: string;
    desc?: string;
    ilk?: BookmarksIlk;
    active?: boolean;
    tags?: number[];
}
