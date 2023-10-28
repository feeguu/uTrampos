import { Injectable } from "@nestjs/common";
import { CompanyService } from "../company.service";

@Injectable()
export class GetCompanyUseCase {
    constructor(
        private readonly companyService: CompanyService
    ) {}
    async execute(companyId: string) {
        return this.companyService.getCompany(companyId);
    }
}