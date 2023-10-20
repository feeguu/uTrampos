import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmResume } from './typeorm-resume.entity';

@Entity('academic_project')
export class TypeOrmAcademicProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeOrmResume, (resume) => resume.academicProjects)
  resume: TypeOrmResume;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  start: string;

  @Column()
  end: string;
}
