import { LanguageRepository } from '@/domain/abstracts/repositories/resume/language.repository';
import { Language } from '@/domain/entities/resume/language.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { TypeOrmLanguage } from '../../entities/resume/typeorm-language.entity';

@Injectable()
export class TypeOrmLanguageRepository implements LanguageRepository {
  static readonly ALL_RELATIONS: FindOptionsRelations<TypeOrmLanguage> = {
    resume: {
      candidate: {
        user: true,
      },
    },
  };
  constructor(
    @InjectRepository(TypeOrmLanguage)
    private readonly languageRepo: Repository<TypeOrmLanguage>,
  ) {}
  async create(entity: Language): Promise<Language> {
    return await this.languageRepo.save(entity);
  }
  async find(id: string): Promise<Language> {
    return await this.languageRepo.findOne({
      where: { id },
      relations: TypeOrmLanguageRepository.ALL_RELATIONS,
    });
  }
  async findAll(): Promise<Language[]> {
    return await this.languageRepo.find({
      relations: TypeOrmLanguageRepository.ALL_RELATIONS,
    });
  }
  async delete(id: string): Promise<void> {
    await this.languageRepo.delete(id);
  }
  async update(id: string, entity: Partial<Language>): Promise<Language> {
    const language = await this.languageRepo.findOne({
      where: { id },
      relations: TypeOrmLanguageRepository.ALL_RELATIONS,
    });
    if (!language) return null;
    await this.languageRepo.update(id, entity);
    return Object.assign(language, entity);
  }

  async findByUserId(userId: string): Promise<Language[]> {
    return await this.languageRepo.find({
      where: { resume: { candidate: { user: { id: userId } } } },
      relations: TypeOrmLanguageRepository.ALL_RELATIONS,
    });
  }
}
