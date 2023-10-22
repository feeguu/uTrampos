import { Candidate } from '@/domain/entities/candidate.entity';
import { User } from '@/domain/entities/user.entity';
import { UserType } from '@/domain/enums/user-type.enum';
import { InMemoryCandidateRepository } from '@/infra/db/inmemory/repositories/inmemory-candidate.repository';
import { Test } from '@nestjs/testing';

describe('InMemoryCandidateRepository', () => {
  let repository: InMemoryCandidateRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [InMemoryCandidateRepository],
    }).compile();
    repository = module.get(InMemoryCandidateRepository);
  });

  describe('create', () => {
    it('should create a new candidate', async () => {
      const user = new User(
        'John Doe',
        '123456789',
        '12345678',
        '123456',
        '12345678',
        UserType.CANDIDATE,
      );
      const candidate = new Candidate(user, '123.123.123-12', '01/01/1970');
      const createdCandidate = await repository.create(candidate);
      expect(createdCandidate).toBeInstanceOf(Candidate);
      expect(createdCandidate).toHaveProperty('id');
    });
  });

  describe('find', () => {
    it('should find a candidate by id', async () => {
      const user = new User(
        'John Doe',
        'johndoe@email.com',
        '123456',
        '123456789',
        '12345678',
        UserType.CANDIDATE,
      );
      const candidate = new Candidate(user, '111.111.111-12', '01/01/1970');
      const createdCandidate = await repository.create(candidate);
      const foundCandidate = await repository.find(createdCandidate.id);
      expect(foundCandidate).toBeInstanceOf(Candidate);
      expect(foundCandidate).toHaveProperty('id');
      expect(foundCandidate.cpf).toBe(candidate.cpf);
    });

    it('should find a candidate by cpf', async () => {
      const foundCandidate = await repository.findByCpf('123.123.123-12');
      expect(foundCandidate).toBeInstanceOf(Candidate);
      expect(foundCandidate).toHaveProperty('id');
      expect(foundCandidate.user.name).toBe('John Doe');
    });

    it('should return null if candidate is not found', async () => {
      const foundCandidate = await repository.findByCpf('000.000.000-00');
      expect(foundCandidate).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a candidate', async () => {
      const candidate = await repository.findByCpf('123.123.123-12');
      candidate.cpf = '111.222.333-44';
      const updatedCandidate = await repository.update(candidate.id, candidate);
      expect(updatedCandidate).toBeInstanceOf(Candidate);
      expect(updatedCandidate).toHaveProperty('id');
      expect(updatedCandidate.cpf).toBe(candidate.cpf);
    });
  });

  describe('delete', () => {
    it('should delete a candidate', async () => {
      const candidate = await repository.findByCpf('111.222.333-44');
      await repository.delete(candidate.id);
      const deletedCandidate = await repository.findByCpf('111.222.333-44');
      expect(deletedCandidate).toBeNull();
    });
    it('should not fail if candidate does not exist', async () => {
      await expect(repository.delete('123')).resolves.not.toThrowError();
    });
  });
});
