import { Injectable } from '@nestjs/common';
import { Candidate } from '@/domain/entities/candidate.entity';
import { Repository } from './generic.repository';

@Injectable()
export abstract class CandidateRepository extends Repository<Candidate> {
  abstract findByEmail(email: string): Promise<Candidate | null>;
  abstract findByCpf(cpf: string): Promise<Candidate | null>;
  abstract findByUserId(userId: string): Promise<Candidate | null>;
}
