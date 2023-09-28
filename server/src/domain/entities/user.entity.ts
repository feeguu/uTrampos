import { randomUUID } from 'crypto';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
