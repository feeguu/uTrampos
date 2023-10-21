import { Level } from '@/domain/enums/level.enum';

export class LanguageDto {
  public id: string;
  public name: string;
  public level: Level;
  constructor(language: LanguageDto) {
    this.id = language.id;
    this.name = language.name;
    this.level = language.level;
  }
}
