import { randomUUID } from 'crypto';
import { User } from './user.entity';
import { UserType } from '../enums/user-type.enum';
import { Resume } from './resume/resume.entity';

export class Candidate {
  public id: string;
  public type: UserType = UserType.CANDIDATE;
  constructor(
    public user: User,
    public cpf: string,
    public birthDate: string,
  ) {
    this.id = randomUUID();
  }
}
