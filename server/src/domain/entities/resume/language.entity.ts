import { Level } from '@/domain/enums/level.enum';
import { randomUUID } from 'crypto';
import { Resume } from './resume.entity';

export class Language {
  public id: string;
  public language: string;
  public level: Level;
  constructor(languageData: { language: string; level: Level }) {
    this.id = randomUUID();
    this.language = languageData.language;
    this.level = languageData.level;
  }
}
