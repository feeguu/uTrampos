import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmResume } from './typeorm-resume.entity';
import { Level } from '@/domain/enums/level.enum';

@Entity('language')
export class TypeOrmLanguage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  language: string;

  @Column({ type: 'enum', enum: Level })
  level: Level;

  @ManyToOne(() => TypeOrmResume, (resume) => resume.languages)
  resume: TypeOrmResume;
}
