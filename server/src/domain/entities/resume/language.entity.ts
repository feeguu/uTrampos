import { Level } from '@/domain/enums/level.enum';

export class Language {
  public id: string;
  public language: string;
  public level: Level;

  constructor(languageData: { language: string; level: Level }) {
    this.id = crypto.randomUUID();
    this.language = languageData.language;
    this.level = languageData.level;
  }
}
