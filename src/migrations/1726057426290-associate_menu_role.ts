import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssociateMenuRole1726057426290 implements MigrationInterface {
  name = 'AssociateMenuRole1726057426290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_8523e13f1ba719e16eb474657ec\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_8523e13f1ba719e16eb474657ec\` FOREIGN KEY (\`parentId\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_8523e13f1ba719e16eb474657ec\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_8523e13f1ba719e16eb474657ec\` FOREIGN KEY (\`parentId\`) REFERENCES \`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
