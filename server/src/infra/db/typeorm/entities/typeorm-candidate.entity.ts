import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmUser } from './typeorm-user.entity';
import { TypeOrmResume } from './resume/typeorm-resume.entity';
import { UserType } from '@/domain/enums/user-type.enum';
import { TypeOrmApply } from './job/typeorm-apply.entity';

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

  @OneToMany(() => TypeOrmApply, (apply) => apply.candidate)
  applies: TypeOrmApply[];

  @OneToOne(() => TypeOrmUser)
  @JoinColumn()
  user: TypeOrmUser;

  @OneToOne(() => TypeOrmResume, {
    cascade: true,
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  resume?: TypeOrmResume;
}
