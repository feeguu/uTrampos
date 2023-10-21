export class KeywordDto {
  public id: string;
  public name: string;
  constructor(keyword: KeywordDto) {
    this.id = keyword.id;
    this.name = keyword.name;
  }
}
