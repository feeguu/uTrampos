import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmUser } from './typeorm-user.entity';
import { TypeOrmResume } from './resume/typeorm-resume.entity';
import { UserType } from '@/domain/enums/user-type.enum';

@Entity('candidate')
export class TypeOrmCandidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf: string;

  @Column()
  birthDate: string;

  @Column({ type: 'enum', enum: UserType })
  type: UserType;

  @OneToOne(() => TypeOrmUser)
  @JoinColumn()
  user: TypeOrmUser;

  @OneToOne(() => TypeOrmResume, { cascade: true })
  @JoinColumn()
  resume: TypeOrmResume;
}
