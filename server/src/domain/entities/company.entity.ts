import { randomUUID } from 'crypto';
import { User } from './user.entity';
import { UserType } from '../enums/user-type.enum';

export class Company {
  public id: string;
  public user: User;
  public type: UserType = UserType.Company;
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public cnpj: string,
  ) {
    this.id = randomUUID();
    this.user = new User(name, email, password, this.type);
  }
}
