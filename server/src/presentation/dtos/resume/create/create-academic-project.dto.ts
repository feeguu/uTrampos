import { IsISO8601, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateAcademicProjectDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  @IsISO8601()
  public startDate: string;

  @ValidateIf((o, v) => v !== undefined)
  @IsNotEmpty()
  @IsISO8601()
  public endDate: string;
}
