import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeBookmarkDescNullable1725676742347 implements MigrationInterface {
    name = 'ChangeBookmarkDescNullable1725676742347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmarks\` CHANGE \`desc\` \`desc\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmarks\` CHANGE \`desc\` \`desc\` varchar(255) NOT NULL`);
    }

}
