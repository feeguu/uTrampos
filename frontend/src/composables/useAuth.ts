import { defineStore } from "pinia"

import type {
	IRegisterUserRequest,
	IRegisterUserResponse,
	IRegisterCompanyRequest,
	IRegisterCompanyResponse,
} from "~/types/api"

export const useAuth = defineStore("auth", () => {
	const user = ref<IUser | null>(null)
	const company = ref<ICompany | null>(null)
	const admin = ref<IAdmin | null>(null)
	const candidate = ref<ICandidate | null>(null)

	async function register(userData: IRegisterUserRequest) {
		const { data, error } = await useAPI<IRegisterUserResponse>("/auth/register", {
			method: "POST",
			body: JSON.stringify(userData),
		})

		if (error || !data) {
			console.error(error?.data.message)
			return
		}

		useToken().set(data?.token)

		navigateTo("/register/" + userData.type.toLowerCase())
	}

	async function registerCompany(companyData: IRegisterCompanyRequest) {
		const { data, error } = await useAPI<IRegisterCompanyResponse>("/auth/register/company", {
			method: "POST",
			body: JSON.stringify(companyData),
		})

		if (error || !data) {
			console.error(error?.data.message)
			return
		}

		user.value = data.user
		company.value = data

		navigateTo("/")
	}

	return { user, company, candidate, admin, register, registerCompany }
})
