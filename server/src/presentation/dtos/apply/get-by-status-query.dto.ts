import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class GetByStatusQueryDto {
  @IsEnum(ApplyStatus)
  @IsOptional()
  status?: ApplyStatus;
}
