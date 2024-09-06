import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FixChange1725547765189 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
