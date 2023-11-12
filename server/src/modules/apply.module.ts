import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { ApplyRepository } from '@/domain/abstracts/repositories/job/apply.repository';
import { TypeOrmApplyRepository } from '@/infra/db/typeorm/repositories/job/typeorm-apply-repository';
import { TypeOrmCandidateRepository } from '@/infra/db/typeorm/repositories/typeorm-candidate.repository';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { ApplyService } from '@/main/apply/apply.service';
import { GetAppliesByCandidateUseCase } from '@/main/apply/use-cases/get-applies-by-candidate-use-case.service';
import { ProceedApplyUseCase } from '@/main/apply/use-cases/proceed-apply-use-case.service';
import { RejectApplyUseCase } from '@/main/apply/use-cases/reject-apply-use-case.service';
import { ApplyController } from '@/presentation/controllers/apply.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ApplyController],
  imports: [TypeOrmDatabaseModule],
  providers: [
    {
      provide: ApplyService,
      useFactory: (
        applyRepository: ApplyRepository,
        candidateRepository: CandidateRepository,
      ) => new ApplyService(applyRepository, candidateRepository),
      inject: [TypeOrmApplyRepository, TypeOrmCandidateRepository],
    },
    GetAppliesByCandidateUseCase,
    ProceedApplyUseCase,
    RejectApplyUseCase,
  ],
})
export class ApplyModule {}
