import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmUser } from './typeorm-user.entity';
import { TypeOrmResume } from './resume/typeorm-resume.entity';

@Entity('candidate')
export class TypeOrmCandidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf: string;

  @Column()
  birthDate: Date;

  @OneToOne(() => TypeOrmUser)
  @JoinColumn()
  user: TypeOrmUser;

  @OneToOne(() => TypeOrmResume)
  @JoinColumn()
  resume: TypeOrmResume;
}
