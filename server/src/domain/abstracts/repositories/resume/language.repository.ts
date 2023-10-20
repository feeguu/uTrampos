import { Language } from '@/domain/entities/resume/language.entity';
import { Repository } from '../generic.repository';

export abstract class LanguageRepository extends Repository<Language> {
  public abstract getByResumeId(resumeId: string): Promise<Language[]>;
}
