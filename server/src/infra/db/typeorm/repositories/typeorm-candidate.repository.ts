import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { TypeOrmUserRepository } from './typeorm-user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCandidate } from '../entities/typeorm-candidate.entity';
import { Repository } from 'typeorm';
import { Candidate } from '@/domain/entities/candidate.entity';
import { User } from '@/domain/entities/user.entity';
import { TypeOrmUser } from '../entities/typeorm-user.entity';

export class TypeOrmCandidateRepository
  extends TypeOrmUserRepository
  implements CandidateRepository
{
  constructor(
    @InjectRepository(TypeOrmCandidate)
    private readonly candidateRepo: Repository<Candidate>,
    @InjectRepository(TypeOrmUser)
    userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<Candidate | null> {
    const candidate = this.candidateRepo.findOne({
      where: { email },
      relations: { user: true },
    });
    if (!candidate) return null;
    return candidate;
  }

  async findByCpf(cpf: string) {
    return this.candidateRepo.findOne({
      where: { cpf },
      relations: { user: true },
    });
  }
}
