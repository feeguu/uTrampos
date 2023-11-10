import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { JobRepository } from '@/domain/abstracts/repositories/job/job.repository';
import { TypeOrmJobRepository } from '@/infra/db/typeorm/repositories/job/typeorm-job-repository';
import { TypeOrmCompanyRepository } from '@/infra/db/typeorm/repositories/typeorm-company.repository';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { CompanyService } from '@/main/company/company.service';
import { GetCompanyJobsUseCase } from '@/main/company/use-cases/get-company-jobs-use-case.service';
import { GetCompanyUseCase } from '@/main/company/use-cases/get-company-use-case.service';
import { GetUserJobsUseCase } from '@/main/company/use-cases/get-user-jobs-use-case.service';
import { CompanyController } from '@/presentation/controllers/company.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CompanyController],
  providers: [
    TypeOrmDatabaseModule,
    {
      provide: CompanyService,
      useFactory: (
        companyRepository: CompanyRepository,
        jobRepository: JobRepository,
      ) => new CompanyService(companyRepository, jobRepository),
      inject: [TypeOrmCompanyRepository, TypeOrmJobRepository],
    },
    GetCompanyJobsUseCase,
    GetCompanyUseCase,
    GetUserJobsUseCase,
  ],
})
export class CompanyModule {}
