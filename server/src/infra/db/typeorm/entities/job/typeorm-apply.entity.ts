import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmJob } from './typeorm-job.entity';
import { TypeOrmCandidate } from '../typeorm-candidate.entity';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';

@Entity('job_apply')
export class TypeOrmApply {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  // ISO 8601
  @Column()
  public datetime: string;

  @Column({ type: 'enum', enum: ApplyStatus, default: ApplyStatus.PENDING })
  public status: ApplyStatus;

  @ManyToOne(() => TypeOrmJob, (job) => job.applies)
  public job: TypeOrmJob;

  @ManyToOne(() => TypeOrmCandidate, (candidate) => candidate.applies)
  public candidate: TypeOrmCandidate;
}
