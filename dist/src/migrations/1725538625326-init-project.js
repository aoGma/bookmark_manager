"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitProject1725538625326 = void 0;
class InitProject1725538625326 {
    constructor() {
        this.name = 'InitProject1725538625326';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bookmarks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(500) NOT NULL, \`desc\` varchar(255) NOT NULL, \`ilk\` enum ('稍后阅读', '收藏参考', '长期保存') NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`clicks\` int NOT NULL, \`create_timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e9a5f433dfd78726fe31e2d329\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_e9a5f433dfd78726fe31e2d329\` ON \`bookmarks\``);
        await queryRunner.query(`DROP TABLE \`bookmarks\``);
        await queryRunner.query(`DROP TABLE \`tags\``);
    }
}
exports.InitProject1725538625326 = InitProject1725538625326;
//# sourceMappingURL=1725538625326-init-project.js.map