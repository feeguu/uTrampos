import { JobDto } from "@/presentation/dtos/job/entities/job.dto";
import { JobService } from "../job.service";

export class GetJobsUseCase {
    constructor(
        private readonly jobsService: JobService
    ){}
    async execute(): Promise<JobDto[]> {
        return await this.jobsService.getJobs()
    }
}