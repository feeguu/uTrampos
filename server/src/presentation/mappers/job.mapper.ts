import { Job } from '@/domain/entities/job/job.entity';
import { JobDto } from '../dtos/job/entities/job.dto';
import { Keyword } from '@/domain/entities/job/keyword.entity';
import { KeywordDto } from '../dtos/job/entities/keyword.dto';
import { SectionDto } from '../dtos/job/entities/section.dto';
import { Section } from '@/domain/entities/job/section.entity';

export class JobMapper {
  static toDto(job: Job): JobDto {
    return new JobDto({
      address: job.address,
      contractType: job.contractType,
      description: job.description,
      id: job.id,
      keywords: job.keywords.map((keyword) => JobMapper.keywordToDto(keyword)),
      salary: job.salary,
      sections: job.sections.map((section) => JobMapper.sectionToDto(section)),
      title: job.title,
    });
  }
  static keywordToDto(keyword: Keyword): KeywordDto {
    return new KeywordDto({
      id: keyword.id,
      name: keyword.name,
    });
  }

  static sectionToDto(section: Section): SectionDto {
    return new SectionDto({
      id: section.id,
      title: section.title,
      description: section.description,
      order: section.order,
    });
  }
}
