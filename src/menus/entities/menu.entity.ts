import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'menus' })
/**
 * 闭包表以特殊的方式将父子之间的关系存储在单独的表中。
 * 无论是阅读还是写作，它都非常高效。
 */
@Tree('closure-table')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    comment: '路由的名称',
  })
  name: string;

  @Column({ nullable: false, comment: '路由的名称，用于命名路由' })
  menuName: string;

  @Column({ nullable: false, comment: '定义路由的路径' })
  path: string;

  @Column({ nullable: false, comment: '对应路由路径的组件' })
  component: string;

  @Column({ comment: '重定向路径', nullable: true })
  redirect?: string;

  @TreeChildren()
  children?: Menu[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent?: Menu;
}
