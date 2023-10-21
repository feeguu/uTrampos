import { Keyword } from '@/domain/entities/job/keyword.entity';
import { Repository } from '../generic.repository';

export abstract class KeywordRepository extends Repository<Keyword> {
  abstract findByJob(jobId: string): Promise<Keyword[]>;
}
