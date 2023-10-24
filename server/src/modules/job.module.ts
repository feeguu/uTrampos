import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { JobRepository } from '@/domain/abstracts/repositories/job/job.repository';
import { TypeOrmJobRepository } from '@/infra/db/typeorm/repositories/job/typeorm-job-repository';
import { TypeOrmCompanyRepository } from '@/infra/db/typeorm/repositories/typeorm-company.repository';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { JobService } from '@/main/job/job.service';
import { CreateJobUseCase } from '@/main/job/use-cases/create-job-use-case.service';
import { GetJobBySlugUseCase } from '@/main/job/use-cases/get-job-by-slug-use-case.service';
import { GetJobsUseCase } from '@/main/job/use-cases/get-jobs-use-case.service';
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
      ) => new JobService(jobRepository, companyRepository),
      inject: [TypeOrmJobRepository, TypeOrmCompanyRepository],
    },
    CreateJobUseCase,
    GetJobsUseCase,
    GetJobBySlugUseCase,
  ],
})
export class JobModule {}
