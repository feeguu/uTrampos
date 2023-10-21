import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmCompany } from '../typeorm-company.entity';
import { TypeOrmSection } from './typeorm-section.entity';
import { TypeOrmKeyword } from './typeorm-keyword.entity';
import { TypeOrmApply } from './typeorm-apply.entity';
import { ContractType } from '@/domain/enums/contract-type.enum';

@Entity('job')
export class TypeOrmJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  salary: number;

  @Column({ type: 'enum', enum: ContractType })
  contractType: ContractType;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => TypeOrmSection, (section) => section.job)
  sections: TypeOrmSection[];

  @OneToMany(() => TypeOrmKeyword, (keyword) => keyword.job)
  keywords: TypeOrmKeyword[];

  @OneToMany(() => TypeOrmApply, (apply) => apply.job)
  applies: TypeOrmApply[];

  @ManyToOne(() => TypeOrmCompany, (company) => company.jobs)
  company: TypeOrmCompany;
}
