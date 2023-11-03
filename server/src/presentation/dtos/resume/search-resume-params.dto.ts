import { EducationType } from '@/domain/enums/education-type';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, Length, Min } from 'class-validator';

export class SearchResumeParamsDto {
  @IsOptional()
  @Length(3)
  name?: string;

  @IsOptional()
  @Length(3)
  q?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split('')))
  skills?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split('')))
  languages?: string[];

  @IsOptional()
  @IsEnum(EducationType)
  minEducationLevel?: EducationType;
}
