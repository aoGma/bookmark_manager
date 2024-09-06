import { Tags } from '../../tags/entities/tag.entity';
export declare enum BookmarksIlk {
    READ_LATER = "\u7A0D\u540E\u9605\u8BFB",
    COLLECTION_REFERENCE = "\u6536\u85CF\u53C2\u8003",
    PRESERVATION = "\u957F\u671F\u4FDD\u5B58"
}
export declare class Bookmarks {
    id: number;
    name: string;
    url: string;
    desc: string;
    ilk: BookmarksIlk;
    active: boolean;
    clicks: number;
    create_timestamp: Date;
    update_timestamp: Date;
    tags: Tags[];
}
