import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeMenuRedirectDefaultNull1726042814413
  implements MigrationInterface
{
  name = 'ChangeMenuRedirectDefaultNull1726042814413';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menus\` CHANGE \`redirect\` \`redirect\` varchar(255) NULL COMMENT '重定向路径'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menus\` CHANGE \`redirect\` \`redirect\` varchar(255) NOT NULL COMMENT '重定向路径'`,
    );
  }
}
