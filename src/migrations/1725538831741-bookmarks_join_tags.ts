import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookmarksJoinTags1725538831741 implements MigrationInterface {
  name = 'BookmarksJoinTags1725538831741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bookmarks_tags_tags\` (\`bookmarksId\` int NOT NULL, \`tagsId\` int NOT NULL, INDEX \`IDX_5fdfd07d8d44eb65927909f8a4\` (\`bookmarksId\`), INDEX \`IDX_01b218bb02b773d1646c69b4e0\` (\`tagsId\`), PRIMARY KEY (\`bookmarksId\`, \`tagsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookmarks_tags_tags\` ADD CONSTRAINT \`FK_5fdfd07d8d44eb65927909f8a4a\` FOREIGN KEY (\`bookmarksId\`) REFERENCES \`bookmarks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookmarks_tags_tags\` ADD CONSTRAINT \`FK_01b218bb02b773d1646c69b4e03\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bookmarks_tags_tags\` DROP FOREIGN KEY \`FK_01b218bb02b773d1646c69b4e03\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookmarks_tags_tags\` DROP FOREIGN KEY \`FK_5fdfd07d8d44eb65927909f8a4a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_01b218bb02b773d1646c69b4e0\` ON \`bookmarks_tags_tags\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5fdfd07d8d44eb65927909f8a4\` ON \`bookmarks_tags_tags\``,
    );
    await queryRunner.query(`DROP TABLE \`bookmarks_tags_tags\``);
  }
}
