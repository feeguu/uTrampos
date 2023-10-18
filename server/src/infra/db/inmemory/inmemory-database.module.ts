import { Module } from '@nestjs/common';
import { InMemoryUserRepository } from './repositories/inmemory-user.repository';
import { InMemoryCandidateRepository } from './repositories/inmemory-candidate.repository';
import { InMemoryCompanyRepository } from './repositories/inmemory-company.repository';

@Module({
  providers: [
    InMemoryUserRepository,
    InMemoryCandidateRepository,
    InMemoryCompanyRepository,
  ],
  exports: [
    InMemoryUserRepository,
    InMemoryCandidateRepository,
    InMemoryCompanyRepository,
  ],
})
export class InMemoryDatabaseModule {}
