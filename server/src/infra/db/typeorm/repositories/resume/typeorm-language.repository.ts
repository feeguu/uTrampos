import { LanguageRepository } from '@/domain/abstracts/repositories/resume/language.repository';
import { Language } from '@/domain/entities/resume/language.entity';
import { Resume } from '@/domain/entities/resume/resume.entity';
import { Level } from '@/domain/enums/level.enum';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmLanguageRepository implements LanguageRepository {
  constructor(private readonly languageRepo: Repository<Language>) {}
  async create(entity: Language): Promise<Language> {
    return await this.languageRepo.save(entity);
  }
  async find(id: string): Promise<Language> {
    return await this.languageRepo.findOne({ where: { id } });
  }
  async findAll(): Promise<Language[]> {
    return await this.languageRepo.find();
  }
  async delete(id: string): Promise<void> {
    await this.languageRepo.delete(id);
  }
  async update(id: string, entity: Partial<Language>): Promise<Language> {
    const language = await this.languageRepo.findOne({ where: { id } });
    if (!language) return null;
    await this.languageRepo.update(id, entity);
    return Object.assign(language, entity);
  }
  async findByNameAndLevel(name: string, level: Level): Promise<Language> {
    return await this.languageRepo.findOne({
      where: { language: name, level },
    });
  }
}
