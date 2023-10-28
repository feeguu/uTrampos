import { EducationStatus } from "@/domain/enums/education-status";
import { EducationType } from "@/domain/enums/education-type";
import { randomUUID } from "crypto";

export class Education {
    public id: string;
    public institution: string;
    public educationType: EducationType;
    public course?: string;
    public startDate: string;
    public endDate?: string;
    public educationStatus: EducationStatus;

    constructor(education: Omit<Education, "id">) {
        this.id = randomUUID();
        this.institution = education.institution;
        this.educationType = education.educationType;
        this.course = education.course;
        this.startDate = education.startDate;
        this.endDate = education.endDate;
        this.educationStatus = education.educationStatus;
    }
}