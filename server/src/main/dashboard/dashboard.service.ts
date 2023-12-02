import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { ApplyRepository } from '@/domain/abstracts/repositories/job/apply.repository';
import { JobRepository } from '@/domain/abstracts/repositories/job/job.repository';
import { ResumeRepository } from '@/domain/abstracts/repositories/resume/resume.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { DashboardDto } from '@/presentation/dtos/dashboard.dto';
import { ApplyStatus } from '@/domain/enums/apply-status.enum';

@Injectable()
export class DashboardService {
  constructor(
    private readonly candidateRepository: CandidateRepository,
    private readonly resumeRepository: ResumeRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly jobRepository: JobRepository,
    private readonly applyRepository: ApplyRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getDashboardData() {
    const cachedData = (await this.cacheManager.get(
      'dashboard',
    )) as DashboardDto;
    if (cachedData) {
      console.log('Returning cached data...');
      return cachedData;
    } else {
      const candidatesPromise = this.candidateRepository.findAll();
      const resumesPromise = this.resumeRepository.findAll();
      const companiesPromise = this.companyRepository.findAll();
      const jobsPromise = this.jobRepository.findAll();
      const appliesPromise = this.applyRepository.findAll();
      const [candidates, resumes, companies, jobs, applies] = await Promise.all(
        [
          candidatesPromise,
          resumesPromise,
          companiesPromise,
          jobsPromise,
          appliesPromise,
        ],
      );

      const percentageOfAnswerApplies =
        applies.length == 0
          ? 0
          : (applies.filter(
              (apply) =>
                apply.status != ApplyStatus.PENDING &&
                apply.status != ApplyStatus.WITHDRAWN,
            ).length /
              applies.length) *
            100;
      const candidatesHired = applies.filter(
        (apply) => apply.status == ApplyStatus.ACCEPTED,
      ).length;
      const candidatesWithLeastOneApply = candidates.filter((candidate) => {
        return applies.find((apply) => apply.candidate.id == candidate.id);
      }).length;
      const candidatesWithLeastOneApplyPercentage =
        (candidatesWithLeastOneApply / candidates.length) * 100;
      const appliesPerJobAverage = applies.length / jobs.length || 0;
      const appliesPerCandidateAverage = applies.length / candidates.length || 0;
      const candidatesPerJobAverage = candidates.length / jobs.length || 0;

      const data: DashboardDto = {
        candidates: candidates.length,
        resumes: resumes.length,
        companies: companies.length,
        jobs: jobs.length,
        applies: applies.length,
        percentageOfAnswerApplies: Number.isFinite(percentageOfAnswerApplies) ? percentageOfAnswerApplies : 0,
        candidatesHired: Number.isFinite(candidatesHired) ? candidatesHired : 0,
        candidatesWithLeastOneApply: Number.isFinite(candidatesWithLeastOneApply) ? candidatesWithLeastOneApply : 0,
        candidatesWithLeastOneApplyPercentage: Number.isFinite(candidatesWithLeastOneApplyPercentage) ? candidatesWithLeastOneApplyPercentage : 0,
        appliesPerJobAverage: Number.isFinite(appliesPerJobAverage) ? appliesPerJobAverage : 0,
        appliesPerCandidateAverage: Number.isFinite(appliesPerCandidateAverage) ? appliesPerCandidateAverage : 0,
        candidatesPerJobAverage: Number.isFinite(candidatesPerJobAverage) ? candidatesPerJobAverage : 0,
      };

      const ONE_HOUR_MILLISECONDS = 1000 * 60 * 60;
      console.log('Setting cache...');
      this.cacheManager.set('dashboard', data, ONE_HOUR_MILLISECONDS);
      return data;
    }
  }
}
