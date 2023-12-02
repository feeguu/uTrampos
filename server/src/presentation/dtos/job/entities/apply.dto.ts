import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { CandidateDto } from '../../candidate.dto';
import { JobDto } from './job.dto'
export class ApplyDto {
  public id: string;
  public candidate: CandidateDto;
  public job: JobDto;
  public datetime: string;
  public status: ApplyStatus;
  constructor(applyDto: ApplyDto) {
    Object.assign(this, applyDto);
  }
}
