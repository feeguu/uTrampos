import { UserRepository } from '@/domain/abstracts/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async find(id: string): Promise<User> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const user = this.users.find((u) => id === u.id);
    if (!user) return null;
    Object.assign(user, userData);
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
