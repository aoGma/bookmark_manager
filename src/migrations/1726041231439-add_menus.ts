import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMenus1726041231439 implements MigrationInterface {
  name = 'AddMenus1726041231439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL COMMENT '路由的名称', \`menuName\` varchar(255) NOT NULL COMMENT '路由的名称，用于命名路由', \`path\` varchar(255) NOT NULL COMMENT '定义路由的路径', \`component\` varchar(255) NOT NULL COMMENT '对应路由路径的组件', \`redirect\` varchar(255) NOT NULL COMMENT '重定向路径', \`parentId\` int NULL, UNIQUE INDEX \`IDX_5e7cfb0b3f9085d296789f6720\` (\`menuName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`menus_closure\` (\`id_ancestor\` int NOT NULL, \`id_descendant\` int NOT NULL, INDEX \`IDX_c81e4048dfb2c0ece2991b2861\` (\`id_ancestor\`), INDEX \`IDX_bf17e591ba8ef6f772d6187888\` (\`id_descendant\`), PRIMARY KEY (\`id_ancestor\`, \`id_descendant\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_8523e13f1ba719e16eb474657ec\` FOREIGN KEY (\`parentId\`) REFERENCES \`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`menus_closure\` ADD CONSTRAINT \`FK_c81e4048dfb2c0ece2991b28616\` FOREIGN KEY (\`id_ancestor\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`menus_closure\` ADD CONSTRAINT \`FK_bf17e591ba8ef6f772d61878884\` FOREIGN KEY (\`id_descendant\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menus_closure\` DROP FOREIGN KEY \`FK_bf17e591ba8ef6f772d61878884\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`menus_closure\` DROP FOREIGN KEY \`FK_c81e4048dfb2c0ece2991b28616\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_8523e13f1ba719e16eb474657ec\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bf17e591ba8ef6f772d6187888\` ON \`menus_closure\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c81e4048dfb2c0ece2991b2861\` ON \`menus_closure\``,
    );
    await queryRunner.query(`DROP TABLE \`menus_closure\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5e7cfb0b3f9085d296789f6720\` ON \`menus\``,
    );
    await queryRunner.query(`DROP TABLE \`menus\``);
  }
}
