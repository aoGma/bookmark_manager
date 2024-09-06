import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeBookmarks1725551317197 implements MigrationInterface {
  name = 'AddCascadeBookmarks1725551317197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tags_bookmarks_bookmarks\` (\`tagsId\` int NOT NULL, \`bookmarksId\` int NOT NULL, INDEX \`IDX_c09ece513115bddf5dbbe9d322\` (\`tagsId\`), INDEX \`IDX_175800e98cfc09edc2579b3126\` (\`bookmarksId\`), PRIMARY KEY (\`tagsId\`, \`bookmarksId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tags_bookmarks_bookmarks\` ADD CONSTRAINT \`FK_c09ece513115bddf5dbbe9d3226\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tags_bookmarks_bookmarks\` ADD CONSTRAINT \`FK_175800e98cfc09edc2579b31263\` FOREIGN KEY (\`bookmarksId\`) REFERENCES \`bookmarks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tags_bookmarks_bookmarks\` DROP FOREIGN KEY \`FK_175800e98cfc09edc2579b31263\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tags_bookmarks_bookmarks\` DROP FOREIGN KEY \`FK_c09ece513115bddf5dbbe9d3226\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_175800e98cfc09edc2579b3126\` ON \`tags_bookmarks_bookmarks\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c09ece513115bddf5dbbe9d322\` ON \`tags_bookmarks_bookmarks\``,
    );
    await queryRunner.query(`DROP TABLE \`tags_bookmarks_bookmarks\``);
  }
}
