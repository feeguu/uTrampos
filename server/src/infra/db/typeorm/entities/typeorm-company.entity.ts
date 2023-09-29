import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmUser } from './typeorm-user.entity';

@Entity()
export class TypeOrmCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @OneToOne(() => TypeOrmUser)
  @JoinColumn()
  user: TypeOrmUser;
}
