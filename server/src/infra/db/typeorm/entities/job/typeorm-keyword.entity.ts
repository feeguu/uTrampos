import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmJob } from './typeorm-job.entity';

@Entity('job_keyword')
export class TypeOrmKeyword {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToOne(() => TypeOrmJob, (job) => job.keywords)
  public job: TypeOrmJob;
}
