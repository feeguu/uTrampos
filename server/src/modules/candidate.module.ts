import { TypeOrmResumeRepository } from '@/infra/db/typeorm/repositories/resume/typeorm-resume.repository';
import { TypeOrmCandidateRepository } from '@/infra/db/typeorm/repositories/typeorm-candidate.repository';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { CandidateService } from '@/main/candidate/candidate.service';
import { GetCandidateResumeUseCase } from '@/main/candidate/use-cases/get-candidate-resume-use-case.service';
import { CandidateController } from '@/presentation/controllers/candidate.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CandidateController],
  imports: [TypeOrmDatabaseModule],
  providers: [
    {
      provide: CandidateService,
      useFactory: (candidateRepository, resumeRepository) =>
        new CandidateService(candidateRepository, resumeRepository),
      inject: [TypeOrmCandidateRepository, TypeOrmResumeRepository],
    },
    GetCandidateResumeUseCase,
  ],
})
export class CandidateModule {}
