import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitProject1725538625326 implements MigrationInterface {
  name = 'InitProject1725538625326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bookmarks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(500) NOT NULL, \`desc\` varchar(255) NOT NULL, \`ilk\` enum ('稍后阅读', '收藏参考', '长期保存') NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`clicks\` int NOT NULL, \`create_timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e9a5f433dfd78726fe31e2d329\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e9a5f433dfd78726fe31e2d329\` ON \`bookmarks\``,
    );
    await queryRunner.query(`DROP TABLE \`bookmarks\``);
    await queryRunner.query(`DROP TABLE \`tags\``);
  }
}
