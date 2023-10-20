import { Language } from '@/domain/entities/resume/language.entity';
import { Repository } from '../generic.repository';
import { Level } from '@/domain/enums/level.enum';

export abstract class LanguageRepository extends Repository<Language> {
  public abstract findByNameAndLevel(
    name: string,
    level: Level,
  ): Promise<Language>;
}
