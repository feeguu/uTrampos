import { randomUUID } from 'crypto';
import { UserType } from '../enums/user-type.enum';

export class User {
  id: string;
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public phone: string,
    public zipCode: string,
    public type: UserType,
  ) {
    this.id = randomUUID();
  }
}
