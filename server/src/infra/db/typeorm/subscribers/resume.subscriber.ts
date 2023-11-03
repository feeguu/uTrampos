import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { TypeOrmResume } from '../entities/resume/typeorm-resume.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@EventSubscriber()
export class ResumeSubscriber
  implements EntitySubscriberInterface<TypeOrmResume>
{
  constructor(@InjectDataSource('default') readonly dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo(): string | Function {
    return TypeOrmResume;
  }

  async beforeInsert(event: InsertEvent<TypeOrmResume>): Promise<any> {
    const name = event.entity.candidate.user.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const description = event.entity.description
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const objective = event.entity.objective
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const additionalInformation = event.entity.additionalInformation
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const professionalExperiences = event.entity.professionalExperiences
      .map(
        (professionalExperience) =>
          `${professionalExperience.position} ${professionalExperience.company}`,
      )
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const skills = event.entity.skills
      .map((skill) => skill.name)
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const academicProjects = event.entity.academicProjects
      .map(
        (academicProject) =>
          `${academicProject.title} ${academicProject.description}`,
      )
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const languages = event.entity.languages
      .map((language) => language.language)
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const educations = event.entity.educations
      .map(
        (education) =>
          `${education.educationType} ${education.institution} ${
            education.course ? education.course : ''
          }`,
      )
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    event.entity.document = (
      await event.queryRunner.query(
        `
    SELECT
    setweight(to_tsvector('portuguese', $1), 'A') || ' ' ||
    setweight(to_tsvector('portuguese', $2), 'B') || ' ' ||
    setweight(to_tsvector('portuguese', $3), 'C') || ' ' ||
    setweight(to_tsvector('portuguese', $4), 'D') as document
    `,
        [
          name,
          `${skills} ${description} ${objective}`,
          `${additionalInformation} ${professionalExperiences}`,
          `${academicProjects} ${languages} ${educations}`,
        ],
      )
    )[0].document;
  }

  async beforeUpdate(event: UpdateEvent<TypeOrmResume>): Promise<any> {
    const name = event.entity.candidate.user.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const description = event.entity.description
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const objective = event.entity.objective
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const additionalInformation = event.entity.additionalInformation
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const professionalExperiences = event.entity.professionalExperiences
      .map(
        (professionalExperience) =>
          `${professionalExperience.position} ${professionalExperience.company}`,
      )
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const skills = event.entity.skills
      .map((skill) => skill.name)
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const academicProjects = event.entity.academicProjects
      .map(
        (academicProject) =>
          `${academicProject.title} ${academicProject.description}`,
      )
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const languages = event.entity.languages
      .map((language) => language.language)
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const educations = event.entity.educations
      .map(
        (education) =>
          `${education.educationType} ${education.institution} ${
            education.course ? education.course : ''
          }`,
      )
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    event.entity.document = (
      await event.queryRunner.query(
        `
    SELECT
    setweight(to_tsvector('portuguese', $1), 'A') || ' ' ||
    setweight(to_tsvector('portuguese', $2), 'B') || ' ' ||
    setweight(to_tsvector('portuguese', $3), 'C') || ' ' ||
    setweight(to_tsvector('portuguese', $4), 'D') as document
    `,
        [
          name,
          `${skills} ${description} ${objective}`,
          `${additionalInformation} ${professionalExperiences}`,
          `${academicProjects} ${languages} ${educations}`,
        ],
      )
    )[0].document;
  }
}
