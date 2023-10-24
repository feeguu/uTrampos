import { ContractType } from '@/domain/enums/contract-type.enum';
import { CreateSectionDto } from './create-section.dto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public description: string;

  @IsNotEmpty()
  @MinLength(6)
  public address: string;

  @IsNotEmpty()
  @Min(0)
  public salary: number;

  @IsEnum(ContractType)
  public contractType: ContractType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  public sections: CreateSectionDto[];

  @IsArray()
  public keywords: string[];
}
