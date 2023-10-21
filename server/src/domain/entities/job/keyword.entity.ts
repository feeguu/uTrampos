import { randomUUID } from 'crypto';

export class Keyword {
  public id: string;
  public name: string;

  constructor(keyword: Omit<Keyword, 'id'>) {
    this.name = keyword.name;
    this.id = randomUUID();
  }
}
