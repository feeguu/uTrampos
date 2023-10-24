import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { TypeOrmJob } from '../entities/job/typeorm-job.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@EventSubscriber()
export class JobSubscriber implements EntitySubscriberInterface<TypeOrmJob> {
  constructor(@InjectDataSource('default') readonly dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo(): string | Function {
    return TypeOrmJob;
  }

  async beforeInsert(event: InsertEvent<TypeOrmJob>): Promise<void> {
    const title = event.entity.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const keywords = event.entity.keywords
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const description = event.entity.description
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const sections = event.entity.sections
      .map((section) => section.description)
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    event.entity.document = (
      await event.queryRunner.query(
        `SELECT
      setweight(to_tsvector('portuguese', $1), 'A') || ' ' ||
      setweight(to_tsvector('portuguese', $2), 'B') || ' ' ||
      setweight(to_tsvector('portuguese', $3), 'C') || ' ' ||
      setweight(to_tsvector('portuguese', $4), 'D') as document`,
        [title, keywords, description, sections],
      )
    )[0].document;
  }

  async beforeUpdate(event: UpdateEvent<TypeOrmJob>): Promise<void> {
    const title = event.entity.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const keywords = event.entity.keywords
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const description = event.entity.description
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const sections = event.entity.sections
      .map((section) => section.description)
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    event.entity.document = (
      await event.queryRunner.query(
        `SELECT
    setweight(to_tsvector('portuguese', $1), 'A') || ' ' ||
    setweight(to_tsvector('portuguese', $2), 'B') || ' ' ||
    setweight(to_tsvector('portuguese', $3), 'C') || ' ' ||
    setweight(to_tsvector('portuguese', $4), 'D') as document`,
        [title, keywords, description, sections],
      )
    )[0].document;
  }
}
