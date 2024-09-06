import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class BookmarksJoinTags1725538831741 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
