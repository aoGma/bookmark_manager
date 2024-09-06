import { MigrationInterface, QueryRunner } from "typeorm";

export class FixChange1725547765189 implements MigrationInterface {
    name = 'FixChange1725547765189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` DROP FOREIGN KEY \`FK_01b218bb02b773d1646c69b4e03\``);
        await queryRunner.query(`ALTER TABLE \`bookmarks\` CHANGE \`ilk\` \`ilk\` enum ('稍后阅读', '收藏参考', '长期保存') NOT NULL DEFAULT '稍后阅读'`);
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` ADD CONSTRAINT \`FK_01b218bb02b773d1646c69b4e03\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` DROP FOREIGN KEY \`FK_01b218bb02b773d1646c69b4e03\``);
        await queryRunner.query(`ALTER TABLE \`bookmarks\` CHANGE \`ilk\` \`ilk\` enum ('稍后阅读', '收藏参考', '长期保存') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` ADD CONSTRAINT \`FK_01b218bb02b773d1646c69b4e03\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
