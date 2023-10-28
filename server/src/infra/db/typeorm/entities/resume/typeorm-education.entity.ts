import { EducationStatus } from "@/domain/enums/education-status";
import { EducationType } from "@/domain/enums/education-type";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeOrmResume } from "./typeorm-resume.entity";

@Entity('education')
export class TypeOrmEducation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    institution: string;

    @Column({type: "enum", enum: EducationType})
    educationType: EducationType;

    @Column({nullable: true})
    course?: string;

    @Column()
    startDate: string;

    @Column({nullable: true})
    endDate?: string;

    @Column({type: "enum", enum: EducationStatus})
    educationStatus: EducationStatus;

    @ManyToOne(() => TypeOrmResume, (resume) => resume.educations)
    resume: TypeOrmResume;

}