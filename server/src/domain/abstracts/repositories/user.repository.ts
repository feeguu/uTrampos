import { User } from '@/domain/entities/user.entity';
import { Repository } from './generic.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserRepository<T = User> extends Repository<User> {
  abstract findByEmail(email: string): Promise<T | null>;
  abstract findByUserId?(userId: string): Promise<T | null>;
}
