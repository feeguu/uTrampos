import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmUser } from './typeorm-user.entity';

@Entity()
export class TypeOrmCandidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf: string;

  @OneToOne(() => TypeOrmUser)
  @JoinColumn()
  user: TypeOrmUser;
}
