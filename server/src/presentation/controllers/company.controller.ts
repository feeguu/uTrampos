import { Public } from "@/main/auth/decorators/public.decorator";
import { GetCompanyJobsUseCase } from "@/main/company/use-cases/get-company-jobs-use-case.service";
import { GetCompanyUseCase } from "@/main/company/use-cases/get-company-use-case.service";
import { Controller, Get, Param } from "@nestjs/common";

@Controller('companies')
export class CompanyController {
    constructor(
        private readonly getCompanyJobsUseCase: GetCompanyJobsUseCase,
        private readonly getCompanyUseCase: GetCompanyUseCase
    ) {}
    
    @Public()
    @Get(':id')
    async getCompany(
        @Param('id') id: string
    ) {
        return await this.getCompanyUseCase.execute(id)
    }

    @Public()
    @Get(':id/jobs') 
    async getCompanyJobs(
        @Param('id') id: string
    ) {
        return this.getCompanyJobsUseCase.execute(id);
    }
}