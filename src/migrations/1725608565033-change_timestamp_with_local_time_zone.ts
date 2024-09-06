import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTimestampWithLocalTimeZone1725608565033
  implements MigrationInterface
{
  name = 'ChangeTimestampWithLocalTimeZone1725608565033';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bookmarks\` ADD \`create_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookmarks\` ADD \`update_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bookmarks\` DROP COLUMN \`update_timestamp\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookmarks\` DROP COLUMN \`create_timestamp\``,
    );
  }
}
