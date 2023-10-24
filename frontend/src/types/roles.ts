interface IUser {
	id: string
	name: string
	email: string
	phone: string
	zipCode: string
	type: string
}

interface ICompany {
	id: string
	cnpj: string
	description: string
	companySize: string
	user: IUser
}

interface IAdmin {
	user: IUser
}
interface ICandidate {
	user: IUser
}

type IAuthUser = ICompany | IAdmin | ICandidate
