export class CreateKeywordDto {
  public name: string;
  constructor(keyword: CreateKeywordDto) {
    this.name = keyword.name;
  }
}
