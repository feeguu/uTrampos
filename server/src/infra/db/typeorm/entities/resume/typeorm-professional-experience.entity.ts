import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmResume } from './typeorm-resume.entity';

@Entity('professional_experience')
export class TypeOrmProfessionalExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeOrmResume, (resume) => resume.professionalExperiences)
  resume: TypeOrmResume;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  description: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string | null;
}
