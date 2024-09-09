import { Users } from '../../users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  roleName: string;

  @OneToMany(() => Users, (users) => users.role, { cascade: true })
  users: Users[];
}
