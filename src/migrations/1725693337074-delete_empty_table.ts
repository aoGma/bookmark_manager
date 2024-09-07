import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteEmptyTable1725693337074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `tags_bookmarks_bookmarks`');
  }

  public async down(): Promise<void> {}
}
