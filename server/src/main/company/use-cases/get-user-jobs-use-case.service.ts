import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company.service';

@Injectable()
export class GetUserJobsUseCase {
  constructor(private readonly companyService: CompanyService) {}

  async execute(userId: string) {
    console.log(userId);
    return await this.companyService.getCompanyJobsByUserId(userId);
  }
}
