import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Tags } from '../../tags/entities/tag.entity';

export enum BookmarksIlk {
  READ_LATER = '稍后阅读',
  COLLECTION_REFERENCE = '收藏参考',
  PRESERVATION = '长期保存',
}

@Entity()
export class Bookmarks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true, length: 500 })
  url: string;

  @Column()
  desc: string;

  @Column({
    type: 'enum',
    enum: BookmarksIlk,
    default: BookmarksIlk.READ_LATER,
  })
  ilk: BookmarksIlk;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ default: 0 })
  clicks: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_timestamp: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_timestamp: Date;

  @ManyToMany(() => Tags)
  @JoinTable()
  tags: Tags[];
}
