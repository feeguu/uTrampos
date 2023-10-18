import { User } from '@/domain/entities/user.entity';
import { UserType } from '@/domain/enums/user-type.enum';
import { InMemoryUserRepository } from '@/infra/db/inmemory/repositories/inmemory-user.repository';
import { Test } from '@nestjs/testing';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [InMemoryUserRepository],
    }).compile();

    repository = module.get(InMemoryUserRepository);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = new User(
        'John Doe',
        'johndoe@email.com',
        '123456',
        '123456789',
        '12345678',
        UserType.Candidate,
      );
      const createdUser = await repository.create(user);
      expect(createdUser).toBeInstanceOf(User);
      expect(createdUser).toHaveProperty('id');
    });
  });

  describe('find', () => {
    it('should find a user by id', async () => {
      const user = new User(
        'Jane Doe',
        'janedoe@email.com',
        '123456',
        '123456789',
        '12345678',
        UserType.Candidate,
      );
      const createdUser = await repository.create(user);
      const foundUser = await repository.find(createdUser.id);
      expect(foundUser).toBeInstanceOf(User);
      expect(foundUser).toHaveProperty('id');
      expect(foundUser.email).toBe(user.email);
    });
    it('should find a user by email', async () => {
      const user = await repository.findByEmail('johndoe@email.com');
      expect(user).toBeInstanceOf(User);
      expect(user).toHaveProperty('id');
      expect(user.name).toBe('John Doe');
    });

    it('should find all users', async () => {
      const users = await repository.findAll();
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBe(2);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = await repository.findByEmail('johndoe@email.com');
      repository.update(user.id, { name: 'John Doe Updated' });
      const updatedUser = await repository.find(user.id);
      expect(updatedUser.name).toBe('John Doe Updated');
    });
    it('should return null if user does not exist', async () => {
      const updatedUser = await repository.update('123', {
        name: 'John Doe Updated',
      });
      expect(updatedUser).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = await repository.findByEmail('johndoe@email.com');
      await repository.delete(user.id);
      const deletedUser = await repository.find(user.id);
      expect(deletedUser).toBeNull();
    });
    it('should not return an error if user does not exist', async () => {
      await expect(repository.delete('123')).resolves.not.toThrow();
    });
  });
});
