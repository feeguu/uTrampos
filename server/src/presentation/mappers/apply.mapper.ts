import { Apply } from '@/domain/entities/job/apply.entity';
import { ApplyDto } from '../dtos/job/entities/apply.dto';
import { CandidateMapper } from './candidate.mapper';
import { JobMapper } from './job.mapper'

export class ApplyMapper {
  static toDto(apply: Apply): ApplyDto {
    return {
      id: apply.id,
      status: apply.status,
      candidate: CandidateMapper.toDto(apply.candidate),
      datetime: apply.datetime,
      job: JobMapper.toDto(apply.job),
    };
  }
}
