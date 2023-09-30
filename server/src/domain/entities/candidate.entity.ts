import { randomUUID } from 'crypto';
import { User } from './user.entity';
import { UserType } from '../enums/user-type.enum';

export class Candidate {
  public id: string;
  public type: UserType = UserType.Candidate;
  constructor(
    public user: User,
    public cpf: string,
    public birthDate: string,
  ) {
    this.id = randomUUID();
  }
}
