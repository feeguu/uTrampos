import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateSkillDto } from './create-skill.dto';
import { CreateProfessionalExperienceDto } from './create-professional-experience.dto';
import { CreateAcademicProjectDto } from './create-academic-project.dto';
import { CreateLanguageDto } from './create-language.dto';
import { CreateSocialNetworkDto } from './create-social-network.dto';
import { Type } from 'class-transformer';

export class CreateResumeDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  objective: string;

  @IsNotEmpty()
  additionalInformation: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  skills: CreateSkillDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProfessionalExperienceDto)
  professionalExperiences: CreateProfessionalExperienceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAcademicProjectDto)
  academicProjects: CreateAcademicProjectDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDto)
  languages: CreateLanguageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSocialNetworkDto)
  socialNetworks: CreateSocialNetworkDto[];
}
