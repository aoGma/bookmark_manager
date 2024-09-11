import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMenuUniqueError1726042960303 implements MigrationInterface {
  name = 'FixMenuUniqueError1726042960303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_5e7cfb0b3f9085d296789f6720\` ON \`menus\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`menus\` ADD UNIQUE INDEX \`IDX_a8bb3519a45e021a147bc87e49\` (\`name\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menus\` DROP INDEX \`IDX_a8bb3519a45e021a147bc87e49\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_5e7cfb0b3f9085d296789f6720\` ON \`menus\` (\`menuName\`)`,
    );
  }
}
