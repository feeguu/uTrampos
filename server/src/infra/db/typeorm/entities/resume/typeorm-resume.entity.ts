import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmProfessionalExperience } from './typeorm-professional-experience.entity';
import { TypeOrmSkill } from './typeorm-skill.entity';
import { TypeOrmSocialNetwork } from './typeorm-social-network.entity';
import { TypeOrmAcademicProject } from './typeorm-academic-project.entity';
import { TypeOrmCandidate } from '../typeorm-candidate.entity';
import { TypeOrmLanguage } from './typeorm-language.entity';

@Entity('resume')
export class TypeOrmResume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => TypeOrmCandidate, (candidate) => candidate.resume, {
    cascade: false,
  })
  candidate: TypeOrmCandidate;

  @Column()
  description: string;

  @Column()
  objective: string;

  @Column()
  additionalInformation: string;

  @OneToMany(
    () => TypeOrmProfessionalExperience,
    (professionalExperience) => professionalExperience.resume,
  )
  professionalExperiences: TypeOrmProfessionalExperience[];

  @OneToMany(() => TypeOrmSkill, (skill) => skill.resume)
  skills: TypeOrmSkill[];

  @OneToMany(() => TypeOrmLanguage, (language) => language.resume)
  languages: TypeOrmLanguage[];

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
