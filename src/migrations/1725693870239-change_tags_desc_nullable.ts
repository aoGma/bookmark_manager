import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTagsDescNullable1725693870239 implements MigrationInterface {
    name = 'ChangeTagsDescNullable1725693870239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tags\` CHANGE \`desc\` \`desc\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tags\` CHANGE \`desc\` \`desc\` varchar(255) NOT NULL`);
    }

}
