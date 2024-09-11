import { Menu } from '../../menus/entities/menu.entity';
import { Users } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  roleName: string;

  @OneToMany(() => Users, (users) => users.role, { cascade: true })
  users: Users[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus: Menu[];
}
