import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Repository<T> {
  abstract create(entity: T): Promise<T>;
  abstract update(id: string, entity: Partial<T>): Promise<T | null>;
  abstract delete(id: string): Promise<void>;
  abstract find(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
}
