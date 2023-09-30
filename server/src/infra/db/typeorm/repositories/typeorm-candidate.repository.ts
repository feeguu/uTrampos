import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCandidate } from '../entities/typeorm-candidate.entity';
import { Repository } from 'typeorm';
import { Candidate } from '@/domain/entities/candidate.entity';

export class TypeOrmCandidateRepository implements CandidateRepository {
  constructor(
    @InjectRepository(TypeOrmCandidate)
    private readonly candidateRepo: Repository<Candidate>,
  ) {}

  async create(entity: Candidate) {
    const newCandidate = this.candidateRepo.create(entity);
    await this.candidateRepo.save(newCandidate);
    return newCandidate;
  }

  async find(id: string) {
    const candidate = this.candidateRepo.findOneBy({ id });
    if (!candidate) return null;
    return candidate;
  }

  async findByCpf(cpf: string) {
    const candidate = this.candidateRepo.findOneBy({ cpf });
    if (!candidate) return null;
    return candidate;
  }

  async findAll(): Promise<Candidate[]> {
    return this.candidateRepo.find();
  }

  async delete(id: string) {
    this.candidateRepo.delete({ id });
  }

  async update(id: string, entity: Partial<Candidate>): Promise<Candidate> {
    const candidate = await this.candidateRepo.findOneBy({ id });
    if (!candidate) return null;
    await this.candidateRepo.update({ id }, entity);
    return Object.assign(candidate, entity);
  }

  async findByEmail(email: string): Promise<Candidate> {
    const candidate = await this.candidateRepo.findOne({
      where: { user: { email } },
    });
    if (!candidate) return null;
    return candidate;
  }
}
