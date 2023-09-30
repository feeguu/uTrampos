import { User } from '@/domain/entities/user.entity';
import { Repository } from './generic.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserRepository extends Repository<User> {
  abstract findByEmail(email: string): Promise<User | null>;
}
