"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFromTagsJoinTable1725593822942 = void 0;
class DeleteFromTagsJoinTable1725593822942 {
    constructor() {
        this.name = 'DeleteFromTagsJoinTable1725593822942';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` DROP FOREIGN KEY \`FK_01b218bb02b773d1646c69b4e03\``);
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` ADD CONSTRAINT \`FK_01b218bb02b773d1646c69b4e03\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` DROP FOREIGN KEY \`FK_01b218bb02b773d1646c69b4e03\``);
        await queryRunner.query(`ALTER TABLE \`bookmarks_tags_tags\` ADD CONSTRAINT \`FK_01b218bb02b773d1646c69b4e03\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.DeleteFromTagsJoinTable1725593822942 = DeleteFromTagsJoinTable1725593822942;
//# sourceMappingURL=1725593822942-delete_from_tags_joinTable.js.map