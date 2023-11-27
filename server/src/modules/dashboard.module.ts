import { TypeOrmApplyRepository } from '@/infra/db/typeorm/repositories/job/typeorm-apply-repository';
import { TypeOrmJobRepository } from '@/infra/db/typeorm/repositories/job/typeorm-job-repository';
import { TypeOrmResumeRepository } from '@/infra/db/typeorm/repositories/resume/typeorm-resume.repository';
import { TypeOrmCandidateRepository } from '@/infra/db/typeorm/repositories/typeorm-candidate.repository';
import { TypeOrmCompanyRepository } from '@/infra/db/typeorm/repositories/typeorm-company.repository';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { DashboardService } from '@/main/dashboard/dashboard.service';
import { DashboardController } from '@/presentation/controllers/dashboard.controller';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DashboardController],
  providers: [
    {
      provide: DashboardService,
      useFactory: (
        candidateRepository,
        resumeRepository,
        companyRepository,
        jobRepository,
        applyRepository,
        cacheManager,
      ) => {
        return new DashboardService(
          candidateRepository,
          resumeRepository,
          companyRepository,
          jobRepository,
          applyRepository,
          cacheManager,
        );
      },
      inject: [
        TypeOrmCandidateRepository,
        TypeOrmResumeRepository,
        TypeOrmCompanyRepository,
        TypeOrmJobRepository,
        TypeOrmApplyRepository,
        CACHE_MANAGER,
      ],
    },
  ],
  imports: [TypeOrmDatabaseModule, CacheModule.register()],
})
export class DashboardModule {}
