import { IsArray, IsNotEmpty } from 'class-validator';
import { CreateSkillDto } from './create-skill.dto';
import { ProfessionalExperience } from '@/domain/entities/resume/professional-experience.entity';
import { CreateProfessionalExperienceDto } from './create-professional-experience.dto';
import { CreateAcademicProjectDto } from './create-academic-project.dto';
import { CreateLanguageDto } from './create-language.dto';
import { CreateSocialNetworkDto } from './create-social-network.dto';

export class CreateResumeDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  objective: string;

  @IsNotEmpty()
  additionalInformation: string;

  @IsArray()
  skills: CreateSkillDto[];

  @IsArray()
  professionalExperiences: CreateProfessionalExperienceDto[];

  @IsArray()
  academicProjects: CreateAcademicProjectDto[];

  @IsArray()
  languages: CreateLanguageDto[];

  @IsArray()
  socialNetworks: CreateSocialNetworkDto[];
}
