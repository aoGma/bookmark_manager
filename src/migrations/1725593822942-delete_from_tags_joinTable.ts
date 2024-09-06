import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteFromTagsJoinTable1725593822942 implements MigrationInterface {
    name = 'DeleteFromTagsJoinTable1725593822942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` DROP FOREIGN KEY \`FK_01b218bb02b773d1646c69b4e03\``);
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` ADD CONSTRAINT \`FK_01b218bb02b773d1646c69b4e03\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` DROP FOREIGN KEY \`FK_01b218bb02b773d1646c69b4e03\``);
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` ADD CONSTRAINT \`FK_01b218bb02b773d1646c69b4e03\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
