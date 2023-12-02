import type { CONTRACT_TYPES } from "./enums/job"
import type {
	EXPERIENCE_TIMES,
	EDUCATION_TYPES,
	EDUCATION_STATUS,
	LANGUAGE_LEVELS,
	SOCIAL_NETWORKS,
} from "./enums/resume"
import type { IAdmin, ICandidate, ICompany, IUser } from "./roles"

export interface ILoginRequest {
	email: string
	password: string
}

export interface IRegisterUserRequest {
	email: string
	password: string
	name: string
	phone: string
	zipCode: string
	type: string
}

export interface IRegisterUserResponse {
	token: string
}

export interface IRegisterCompanyRequest {
	cnpj: string
	description: string
	companySize: string
}

export interface IRegisterCompanyResponse extends ICompany {
	user: IUser
}

export interface IRegisterCandidateRequest {
	cpf: string
	birthDate: string
}

export interface IRegisterCandidateResponse extends ICandidate {
	user: IUser
}

export interface IErrorResponse {
	message: string[]
	error: string
	statusCode: number
}

export interface ICreateJobsRequest {
	title: string
	description: string
	address: string
	salary: number
	contractType: string
	sections: {
		title: string
		description: string
		order: number
	}[]
	keywords: string[]
}

export interface IJob {
	id: string
	title: string
	description: string
	contractType: keyof typeof CONTRACT_TYPES
	salary: number
	address: string
	sections: {
		id: string
		title: string
		description: string
		order: number
	}[]
	keywords: string[]
	slug: string
	company: ICompany & {
		user: IUser
	}
}

export interface ICreateResumeResponse {
	id: string
	description: string
	objective: string
	additionalInformation: string
	skills: {
		id: string
		name: string
		experienceTime: keyof typeof EXPERIENCE_TIMES
	}[]
	professionalExperiences: {
		id: string
		company: string
		description: string
		position: string
		startDate: string
		endDate: string
	}[]
	academicProjects: {
		id: string
		title: string
		description: string
		startDate: string
		endDate: string
	}[]
	languages: {
		id: string
		language: string
		level: keyof typeof LANGUAGE_LEVELS
	}[]
	socialNetworks: {
		id: string
		socialNetwork: keyof typeof SOCIAL_NETWORKS
		url: string
	}[]
	candidate: {
		user: {
			id: string
			name: string
			email: string
			phone: string
			zipCode: string
			type: string
		}
		id: string
		cpf: string
		birthDate: string
		type: string
	}
	educations: {
		id: string
		institution: string
		educationType: keyof typeof EDUCATION_TYPES
		course: string
		startDate: string
		endDate: string
		status: keyof typeof EDUCATION_STATUS
	}[]
}

export interface ICreateResumeRequest {
	description: string
	objective: string
	additionalInformation: string
	skills: {
		name: string
		experienceTime: keyof typeof EXPERIENCE_TIMES
	}[]
	professionalExperiences: {
		company: string
		position: string
		description: string
		startDate: string
		endDate: string
	}[]
	academicProjects: {
		title: string
		description: string
		startDate: string
		endDate: string
	}[]
	languages: {
		name: string
		level: keyof typeof LANGUAGE_LEVELS
	}[]
	socialNetworks: {
		socialNetwork: keyof typeof SOCIAL_NETWORKS
		url: string
	}[]
	educations: {
		institution: string
		educationType: keyof typeof EDUCATION_TYPES
		status: keyof typeof EDUCATION_STATUS
		startDate: string
		endDate: string
		course: string
	}[]
}

export interface Apply {
	id: string
	status: string
	candidate: {
		user: {
			id: string
			name: string
			email: string
			phone: string
			zipCode: string
			type: string
		}
		id: string
		cpf: string
		birthDate: string
		type: string
		resume: {
			id: string
			description: string
			objective: string
			additionalInformation: string
		}
	}
	datetime: string
}

export interface IDashboard {
	candidates: number
	resumes: number
	companies: number
	jobs: number
	applies: number
	percentageOfAnswerApplies: number
	candidatesHired: number
	candidatesWithLeastOneApply: number
	candidatesWithLeastOneApplyPercentage: number
	appliesPerJobAverage: number
	appliesPerCandidateAverage: number
	candidatesPerJobAverage: number
}
