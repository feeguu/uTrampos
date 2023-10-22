import { Level } from '@/domain/enums/level.enum';

export class LanguageDto {
  public id: string;
  public language: string;
  public level: Level;
  constructor(language: LanguageDto) {
    this.id = language.id;
    this.language = language.language;
    this.level = language.level;
  }
}
