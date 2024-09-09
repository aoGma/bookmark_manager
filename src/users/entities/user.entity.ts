import { Exclude } from 'class-transformer';
import { Roles } from '../../roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @ManyToOne(() => Roles, (roles) => roles.users)
  @Exclude()
  role: Roles;

  @Column({ type: 'boolean', default: true })
  active: boolean;

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
}
