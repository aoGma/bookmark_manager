import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class DeleteFromTagsJoinTable1725593822942 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
