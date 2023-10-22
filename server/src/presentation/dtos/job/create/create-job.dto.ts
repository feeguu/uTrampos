import { Company } from '@/domain/entities/company.entity';
import { ContractType } from '@/domain/enums/contract-type.enum';
import { CreateSectionDto } from './create-section.dto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
} from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public address: string;

  @IsNotEmpty()
  @IsPositive()
  public salary: number;

  @IsEnum(ContractType)
  public contractType: ContractType;

  @IsArray()
  public sections: CreateSectionDto[];

  @IsArray()
  public keywords: string[];
}
