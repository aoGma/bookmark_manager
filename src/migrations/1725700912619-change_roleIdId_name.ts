import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRoleIdIdName1725700912619 implements MigrationInterface {
  name = 'ChangeRoleIdIdName1725700912619';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_66b740bc08c565eb2eb6306fa0e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`roleIdId\` \`roleId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`roleId\` \`roleIdId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_66b740bc08c565eb2eb6306fa0e\` FOREIGN KEY (\`roleIdId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
