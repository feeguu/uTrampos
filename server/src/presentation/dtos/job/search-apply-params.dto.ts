import { ApplyStatus } from '@/domain/enums/apply-status.enum';
import { IsEnum, IsOptional, IsPositive, Min } from 'class-validator';

export class SearchApplyParamsDto {
  @IsOptional()
  @IsEnum(ApplyStatus)
  status?: ApplyStatus;

  @IsOptional()
  query?: string;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;
}
