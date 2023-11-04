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
}

export interface IAdmin {
	id: string
}

export interface ICandidate {
	id: string
	cpf: string
	birthDate: string
}

export interface IAuthUser {
	user: IUser
	candidate?: ICandidate
	company?: ICompany
	admin?: IAdmin
}
