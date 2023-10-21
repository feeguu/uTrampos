import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmJob } from './typeorm-job.entity';

@Entity('job_section')
export class TypeOrmSection {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public order: number;

  @ManyToOne(() => TypeOrmJob, (job) => job.sections)
  public job: TypeOrmJob;
}
