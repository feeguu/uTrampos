import { Public } from "@/main/auth/decorators/public.decorator";
import { GetCompanyJobsUseCase } from "@/main/company/use-cases/get-company-jobs-use-case.service";
import { Controller, Get, Param } from "@nestjs/common";

@Controller('companies')
export class CompanyController {
    constructor(
        private readonly getCompanyJobsUseCase: GetCompanyJobsUseCase,
    ) {}

    @Public()
    @Get(':id/jobs') 
    async getCompanyJobs(
        @Param('id') id: string
    ) {
        return this.getCompanyJobsUseCase.execute(id);
    }
}