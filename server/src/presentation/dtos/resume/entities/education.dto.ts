import { EducationStatus } from "@/domain/enums/education-status";
import { EducationType } from "@/domain/enums/education-type";

export class EducationDto {
    public id: string;
    public institution: string;
    public educationType: EducationType;
    public course?: string;
    public startDate: string;
    public endDate?: string;
    public status: EducationStatus;

    constructor(education: EducationDto) {
        this.id = education.id;
        this.institution = education.institution;
        this.educationType = education.educationType;
        this.course = education.course;
        this.startDate = education.startDate;
        this.endDate = education.endDate;
        this.status = education.status;
    }
}