"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyAllTable1725543542284 = void 0;
class ModifyAllTable1725543542284 {
    constructor() {
        this.name = 'ModifyAllTable1725543542284';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tags\` ADD UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`bookmarks\` CHANGE \`clicks\` \`clicks\` int NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`bookmarks\` CHANGE \`clicks\` \`clicks\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tags\` DROP INDEX \`IDX_d90243459a697eadb8ad56e909\``);
    }
}
exports.ModifyAllTable1725543542284 = ModifyAllTable1725543542284;
//# sourceMappingURL=1725543542284-modify_all_table.js.map