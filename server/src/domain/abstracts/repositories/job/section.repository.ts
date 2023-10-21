import { Section } from '@/domain/entities/job/section.entity';
import { Repository } from '../generic.repository';

export abstract class SectionRepository extends Repository<Section> {
  abstract findByJob(jobId: string): Promise<Section[]>;
}
