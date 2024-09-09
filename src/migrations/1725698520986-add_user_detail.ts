import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserDetail1725698520986 implements MigrationInterface {
  name = 'AddUserDetail1725698520986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`active\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`create_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`update_timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`update_timestamp\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`create_timestamp\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`active\``);
  }
}
