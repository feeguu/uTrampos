import { UserRepository } from '@/domain/abstracts/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUser } from '../entities/typeorm-user.entity';

@Injectable()
export class TypeOrmUserRepository<T = User> implements UserRepository<T> {
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(entity: User) {
    const newUser = this.userRepo.create(entity);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async find(id: string) {
    return this.userRepo.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneBy({ email }) as T | null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async delete(id: string) {
    this.userRepo.delete({ id });
  }

  async update(id: string, entity: Partial<User>): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) return null;
    await this.userRepo.update({ id }, entity);
    return Object.assign(user, entity);
  }
}
