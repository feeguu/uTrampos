import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { ApplyRepository } from '@/domain/abstracts/repositories/job/apply.repository';
import { JobRepository } from '@/domain/abstracts/repositories/job/job.repository';
import { ResumeRepository } from '@/domain/abstracts/repositories/resume/resume.repository';
import { TypeOrmApplyRepository } from '@/infra/db/typeorm/repositories/job/typeorm-apply-repository';
import { TypeOrmJobRepository } from '@/infra/db/typeorm/repositories/job/typeorm-job-repository';
import { TypeOrmResumeRepository } from '@/infra/db/typeorm/repositories/resume/typeorm-resume.repository';
import { TypeOrmCandidateRepository } from '@/infra/db/typeorm/repositories/typeorm-candidate.repository';
import { TypeOrmCompanyRepository } from '@/infra/db/typeorm/repositories/typeorm-company.repository';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { JobService } from '@/main/job/job.service';
import { CandidateApplyToJobUseCase } from '@/main/job/use-cases/candidate-apply-to-job-use-case.service';
import { CandidateWithdrawToJobUseCase } from '@/main/job/use-cases/candidate-withdraw-to-job-use-case.service';
import { CreateJobUseCase } from '@/main/job/use-cases/create-job-use-case.service';
import { DeleteJobUseCase } from '@/main/job/use-cases/delete-job-use-case.service';
import { GetJobBySlugUseCase } from '@/main/job/use-cases/get-job-by-slug-use-case.service';
import { GetJobsUseCase } from '@/main/job/use-cases/get-jobs-use-case.service';
import { SearchAppliesInJobUseCase } from '@/main/job/use-cases/search-applies-in-job-use-case.service';
import { UpdateJobUseCase } from '@/main/job/use-cases/update-job-use-case.service';
import { JobController } from '@/presentation/controllers/job.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [JobController],
  providers: [
    TypeOrmDatabaseModule,
    {
      provide: JobService,
      useFactory: (
        jobRepository: JobRepository,
        companyRepository: CompanyRepository,
        candidateRepository: CandidateRepository,
        resumeRepository: ResumeRepository,
        applyRepository: ApplyRepository,
      ) =>
        new JobService(
          jobRepository,
          companyRepository,
          candidateRepository,
          resumeRepository,
          applyRepository,
        ),
      inject: [
        TypeOrmJobRepository,
        TypeOrmCompanyRepository,
        TypeOrmCandidateRepository,
        TypeOrmResumeRepository,
        TypeOrmApplyRepository,
      ],
    },
    CreateJobUseCase,
    GetJobsUseCase,
    GetJobBySlugUseCase,
    UpdateJobUseCase,
    DeleteJobUseCase,
    CandidateApplyToJobUseCase,
    CandidateWithdrawToJobUseCase,
    SearchAppliesInJobUseCase,
  ],
})
export class JobModule {}
