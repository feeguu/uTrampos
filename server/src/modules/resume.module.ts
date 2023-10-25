import { TypeOrmLanguageRepository } from '@/infra/db/typeorm/repositories/resume/typeorm-language.repository';
import { TypeOrmResumeRepository } from '@/infra/db/typeorm/repositories/resume/typeorm-resume.repository';
import { TypeOrmSkillRepository } from '@/infra/db/typeorm/repositories/resume/typeorm-skill.repository';
import { TypeOrmCandidateRepository } from '@/infra/db/typeorm/repositories/typeorm-candidate.repository';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { ResumeService } from '@/main/resume/resume.service';
import CreateResumeUseCase from '@/main/resume/use-cases/create-resume-use-case.service';
import { DeleteResumeUseCase } from '@/main/resume/use-cases/delete-resume-use-case.service';
import { GetResumeUseCase } from '@/main/resume/use-cases/get-resume-use-case.service';
import { UpdateResumeUseCase } from '@/main/resume/use-cases/update-resume-use-case.service';
import { ResumeController } from '@/presentation/controllers/resume.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmDatabaseModule],
  controllers: [ResumeController],
  providers: [
    {
      provide: ResumeService,
      useFactory: (
        resumeRepository,
        candidateRepository,
        languageRepository,
        skillRepository,
      ) =>
        new ResumeService(
          resumeRepository,
          candidateRepository,
          languageRepository,
          skillRepository,
        ),
      inject: [
        TypeOrmResumeRepository,
        TypeOrmCandidateRepository,
        TypeOrmLanguageRepository,
        TypeOrmSkillRepository,
      ],
    },
    CreateResumeUseCase,
    GetResumeUseCase,
    UpdateResumeUseCase,
    DeleteResumeUseCase,
  ],
})
export class ResumeModule {}
