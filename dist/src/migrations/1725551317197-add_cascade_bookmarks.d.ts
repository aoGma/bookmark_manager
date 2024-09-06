import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddCascadeBookmarks1725551317197 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
