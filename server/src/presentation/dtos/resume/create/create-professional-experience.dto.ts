import { IsISO8601, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateProfessionalExperienceDto {
  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsISO8601()
  startDate: string;

  @ValidateIf((o) => o.endDate !== undefined)
  @IsISO8601()
  endDate: string;
}
