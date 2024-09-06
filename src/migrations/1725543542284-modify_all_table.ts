import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyAllTable1725543542284 implements MigrationInterface {
  name = 'ModifyAllTable1725543542284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tags\` ADD UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookmarks\` CHANGE \`clicks\` \`clicks\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bookmarks\` CHANGE \`clicks\` \`clicks\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` DROP INDEX \`IDX_d90243459a697eadb8ad56e909\``,
    );
  }
}
