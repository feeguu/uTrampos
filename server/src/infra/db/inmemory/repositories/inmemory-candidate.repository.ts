import { CandidateRepository } from '@/domain/abstracts/repositories/candidate.repository';
import { Candidate } from '@/domain/entities/candidate.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryCandidateRepository implements CandidateRepository {
  private candidates: Candidate[] = [];
  async create(entity: Candidate): Promise<Candidate> {
    this.candidates.push(entity);
    return entity;
  }
  async find(id: string): Promise<Candidate> {
    return this.candidates.find((candidate) => candidate.id === id) || null;
  }
  async findAll(): Promise<Candidate[]> {
    return this.candidates;
  }

  async update(
    id: string,
    candidateData: Partial<Candidate>,
  ): Promise<Candidate | null> {
    const candidate = this.candidates.find((c) => id === c.id);
    if (!candidate) return null;
    Object.assign(candidate, candidateData);
    return candidate;
  }

  async delete(id: string): Promise<void> {
    this.candidates = this.candidates.filter(
      (candidate) => candidate.id !== id,
    );
  }

  async findByEmail(email: string): Promise<Candidate | null> {
    return (
      this.candidates.find((candidate) => candidate.user.email === email) ||
      null
    );
  }

  async findByCpf(cpf: string): Promise<Candidate> {
    return this.candidates.find((candidate) => candidate.cpf === cpf) || null;
  }
}
