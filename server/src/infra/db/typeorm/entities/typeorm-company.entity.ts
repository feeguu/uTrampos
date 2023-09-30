import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmUser } from './typeorm-user.entity';
import { CompanySize } from '@/domain/enums/company-size.enum';

@Entity()
export class TypeOrmCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @Column()
  description: string;

  @Column({
    enum: CompanySize,
  })
  companySize: CompanySize;

  @OneToOne(() => TypeOrmUser)
  @JoinColumn()
  user: TypeOrmUser;
}
