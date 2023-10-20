import { ExperienceTime } from '@/domain/enums/experience-time.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmResume } from './typeorm-resume.entity';

@Entity('skill')
export class TypeOrmSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ExperienceTime,
    default: ExperienceTime.LESS_THAN_ONE_YEAR,
  })
  experienceTime: ExperienceTime;

  @ManyToOne(() => TypeOrmResume, (resume) => resume.skills)
  resume: TypeOrmResume;
}
