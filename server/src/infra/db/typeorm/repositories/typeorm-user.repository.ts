import { UserRepository } from '@/domain/abstracts/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserRepository)
    private readonly repository: Repository<User>,
  ) {}

  async create(entity: User) {
    return this.repository.create(entity);
  }

  async find(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async delete(id: string) {
    this.repository.delete({ id });
  }

  async update(id: string, entity: Partial<User>): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    await this.repository.update({ id }, entity);
    return Object.assign(user, entity);
  }
}
