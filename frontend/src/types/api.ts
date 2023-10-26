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

export interface IRegisterCandidateRequest {}

export interface IRegisterCandidateResponse extends ICandidate {
	user: IUser
}

export interface IErrorResponse {
	message: string[]
	error: string
	statusCode: number
}
