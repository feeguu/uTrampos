import { EducationStatus } from "@/domain/enums/education-status";
import { EducationType } from "@/domain/enums/education-type";
import { IsDateString, IsEnum, IsNotEmpty, ValidateIf } from "class-validator";

export class CreateEducationDto {
    @IsNotEmpty()
    public institution: string;

    @IsNotEmpty()
    @IsEnum(EducationType)
    public educationType: EducationType;

    @IsNotEmpty()
    @IsEnum(EducationStatus)
    public status: EducationStatus;

    @IsNotEmpty()
    @IsDateString()
    public startDate: string;

    @ValidateIf((education) => education.status === EducationStatus.FINISHED)
    @IsNotEmpty()
    @IsDateString()
    public endDate?: string;

    @ValidateIf((education) => education.educationType !== EducationType.SECONDARY)
    @IsNotEmpty()
    public course?: string;
}