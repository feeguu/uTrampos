import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Candidate } from '@/domain/entities/candidate.entity';

@Injectable()
export abstract class CandidateRepository extends UserRepository<Candidate> {
  abstract findByCpf(cpf: string): Promise<Candidate | null>;
}
