import { Global, Module } from '@nestjs/common';
import { TypeOrmUserRepository } from './repositories/typeorm-user.repository';
import { TypeOrmCandidateRepository } from './repositories/typeorm-candidate.repository';
import { TypeOrmCompanyRepository } from './repositories/typeorm-company.repository';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmUser } from './entities/typeorm-user.entity';
import { TypeOrmCandidate } from './entities/typeorm-candidate.entity';
import { TypeOrmCompany } from './entities/typeorm-company.entity';
import { TypeOrmResume } from './entities/resume/typeorm-resume.entity';
import { TypeOrmAcademicProject } from './entities/resume/typeorm-academic-project.entity';
import { TypeOrmProfessionalExperience } from './entities/resume/typeorm-professional-experience.entity';
import { TypeOrmSkill } from './entities/resume/typeorm-skill.entity';
import { TypeOrmSocialNetwork } from './entities/resume/typeorm-social-network.entity';
import { TypeOrmResumeRepository } from './repositories/resume/typeorm-resume.repository';
import { TypeOrmSkillRepository } from './repositories/resume/typeorm-skill.repository';
import { TypeOrmLanguageRepository } from './repositories/resume/typeorm-language.repository';
import { TypeOrmLanguage } from './entities/resume/typeorm-language.entity';
import { TypeOrmApply } from './entities/job/typeorm-apply.entity';
import { TypeOrmJob } from './entities/job/typeorm-job.entity';
import { TypeOrmSection } from './entities/job/typeorm-section.entity';
import { TypeOrmJobRepository } from './repositories/job/typeorm-job-repository';
import { JobSubscriber } from './subscribers/job.subscriber';
import { TypeOrmEducation } from './entities/resume/typeorm-education.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          database: configService.get<string>('DB_DATABASE'),
          type: configService.get<string>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      TypeOrmUser,
      TypeOrmCandidate,
      TypeOrmCompany,
      TypeOrmResume,
      TypeOrmAcademicProject,
      TypeOrmProfessionalExperience,
      TypeOrmSkill,
      TypeOrmSocialNetwork,
      TypeOrmLanguage,
      TypeOrmApply,
      TypeOrmJob,
      TypeOrmSection,
      TypeOrmEducation,
    ]),
  ],
  providers: [
    TypeOrmUserRepository,
    TypeOrmCandidateRepository,
    TypeOrmCompanyRepository,
    TypeOrmResumeRepository,
    TypeOrmSkillRepository,
    TypeOrmLanguageRepository,
    TypeOrmJobRepository,
    JobSubscriber,
  ],
  exports: [
    TypeOrmUserRepository,
    TypeOrmCandidateRepository,
    TypeOrmCompanyRepository,
    TypeOrmResumeRepository,
    TypeOrmSkillRepository,
    TypeOrmLanguageRepository,
    TypeOrmJobRepository,
  ],
})
export class TypeOrmDatabaseModule {}
