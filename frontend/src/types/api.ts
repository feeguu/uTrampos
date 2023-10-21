export interface IUserRegister {
	email: string
	password: string
	name: string
	phone: string
	zipCode: string
	type: string
}

export interface IUserRegisterResponse {
	token: string
}

export interface ICompanyRegister {
	cnpj: string
	description: string
	companySize: string
}

export interface IErrorResponse {
	message: string[]
	error: string
	statusCode: number
}

export interface ICompany {
	id: string
	cnpj: string
	description: string
	companySize: string
	user: IUser
}

export interface IUser {
	id: string
	name: string
	email: string
	phone: string
	zipCode: string
	type: string
}
