import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmUser } from './typeorm-user.entity';
import { CompanySize } from '@/domain/enums/company-size.enum';
import { TypeOrmJob } from './job/typeorm-job.entity';

@Entity('company')
export class TypeOrmCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: CompanySize,
  })
  companySize: CompanySize;

  @OneToMany(() => TypeOrmJob, (job) => job.company)
  jobs: TypeOrmJob[];

  @OneToOne(() => TypeOrmUser)
  @JoinColumn()
  user: TypeOrmUser;
}
