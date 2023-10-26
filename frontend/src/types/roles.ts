export interface IUser {
	id: string
	name: string
	email: string
	phone: string
	zipCode: string
	type: string
}

export interface ICompany {
	id: string
	cnpj: string
	description: string
	companySize: string
	user: IUser
}

export interface IAdmin {
	user: IUser
}

export interface ICandidate {
	user: IUser
}

export type IAuthUser = ICompany | IAdmin | ICandidate
