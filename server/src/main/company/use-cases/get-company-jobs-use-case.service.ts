import { Injectable } from "@nestjs/common";
import { CompanyService } from "../company.service";

@Injectable()
export class GetCompanyJobsUseCase {
    constructor(
        private readonly companyService: CompanyService
    ) {}
    async execute(companyId: string) {
        return this.companyService.getCompanyJobs(companyId)
    }
}