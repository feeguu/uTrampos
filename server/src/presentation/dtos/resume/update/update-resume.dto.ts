import { PartialType } from '@nestjs/swagger';
import { CreateResumeDto } from '../create/create-resume.dto';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {}
