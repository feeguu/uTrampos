import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmCompany } from '../typeorm-company.entity';
import { TypeOrmSection } from './typeorm-section.entity';
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

  @Column('varchar', { array: true })
  keywords: string[];

  @Column('tsvector', { nullable: true, select: false })
  document: string;

  @OneToMany(() => TypeOrmSection, (section) => section.job, {
    cascade: true,
  })
  sections: TypeOrmSection[];

  @OneToMany(() => TypeOrmApply, (apply) => apply.job, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  applies: TypeOrmApply[];

  @ManyToOne(() => TypeOrmCompany, (company) => company.jobs)
  company: TypeOrmCompany;
}
