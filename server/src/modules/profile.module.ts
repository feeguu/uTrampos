import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { CompanyRepository } from '@/domain/abstracts/repositories/company.repository';
import { TypeOrmCandidateRepository } from '@/infra/db/typeorm/repositories/typeorm-candidate.repository';
import { TypeOrmCompanyRepository } from '@/infra/db/typeorm/repositories/typeorm-company.repository';
import { TypeOrmDatabaseModule } from '@/infra/db/typeorm/typeorm-database.module';
import { GetProfileUseCase } from '@/main/profile/get-profile-use-case.service';
import { ProfileController } from '@/presentation/controllers/profile.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    TypeOrmDatabaseModule,
    {
      provide: GetProfileUseCase,
      useFactory: (
        companyRepository: CompanyRepository,
        candidateRepository: CandidateRepository,
      ) => new GetProfileUseCase(companyRepository, candidateRepository),
      inject: [TypeOrmCompanyRepository, TypeOrmCandidateRepository],
    },
  ],
  controllers: [ProfileController],
})
export class ProfileModule {}
