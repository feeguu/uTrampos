import { Level } from '@/domain/enums/level.enum';

export class Language {
  public id: String;
  public language: String;
  public level: Level;

  constructor(languageData: { language: String; level: Level }) {
    this.id = crypto.randomUUID();
    this.language = languageData.language;
    this.level = languageData.level;
  }
}
