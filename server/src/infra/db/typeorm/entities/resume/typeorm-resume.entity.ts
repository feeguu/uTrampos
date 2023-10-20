import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmProfessionalExperience } from './typeorm-professional-experience.entity';
import { TypeOrmSkill } from './typeorm-skill.entity';
import { TypeOrmSocialNetwork } from './typeorm-social-network.entity';
import { TypeOrmAcademicProject } from './typeorm-academic-project.entity';
import { TypeOrmCandidate } from '../typeorm-candidate.entity';

@Entity('resume')
export class TypeOrmResume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => TypeOrmCandidate, (candidate) => candidate.resume)
  candidate: TypeOrmCandidate;

  @Column()
  description: string;

  @Column()
  objective: string;

  @OneToMany(
    () => TypeOrmProfessionalExperience,
    (professionalExperience) => professionalExperience.resume,
  )
  professionalExperiences: TypeOrmProfessionalExperience[];

  @ManyToMany(() => TypeOrmSkill, (skill) => skill.resumes)
  skills: TypeOrmSkill[];

  @OneToMany(
    () => TypeOrmSocialNetwork,
    (socialNetwork) => socialNetwork.resume,
  )
  socialNetworks: TypeOrmSocialNetwork[];

  @OneToMany(
    () => TypeOrmAcademicProject,
    (academicProject) => academicProject.resume,
  )
  academicProjects: TypeOrmAcademicProject[];
}
