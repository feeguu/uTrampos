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
	contractType: string
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
		experienceTime: string
	}[]
	professionalExperiences: {
		company: string
		description: string
		startDate: Date
		endDate: Date
	}[]
	academicProjects: {
		id: string
		title: string
		description: string
		startDate: Date
		endDate: Date
	}[]
	languages: {
		id: string
		language: string
		level: string
	}[]
	socialNetworks: {
		id: string
		socialNetwork: string
		url: string
	}[]
	candidate: ICandidate & {
		user: IUser
	}
}
