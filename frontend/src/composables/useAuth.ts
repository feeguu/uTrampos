import { defineStore } from "pinia"

import type {
	IRegisterUserRequest,
	IRegisterUserResponse,
	IRegisterCompanyRequest,
	IRegisterCompanyResponse,
	IRegisterCandidateRequest,
	IRegisterCandidateResponse,
	ILoginRequest,
} from "~/types/api"

import type { IAdmin, ICandidate, ICompany, IUser } from "~/types/roles"

export const useAuth = defineStore("auth", () => {
	const toast = useToast()

	const user = ref<IUser | null>()
	const company = ref<ICompany | null>()
	const admin = ref<IAdmin | null>()
	const candidate = ref<ICandidate | null>()

	async function login(loginData: ILoginRequest) {
		const { data, error } = await useAPI<IRegisterUserResponse>("/auth/login", {
			method: "POST",
			body: JSON.stringify(loginData),
		})

		if (error || !data) {
			const errorMessage = error?.data?.message ?? "Algo deu errado. Tente novamente mais tarde."
			console.error(errorMessage)
			toast.error(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage)
			return
		}

		useToken().set(data.token)

		navigateTo("/")
	}

	async function register(userData: IRegisterUserRequest) {
		const { data, error } = await useAPI<IRegisterUserResponse>("/auth/register", {
			method: "POST",
			body: JSON.stringify(userData),
		})

		if (error || !data) {
			const errorMessage = error?.data?.message ?? "Algo deu errado. Tente novamente mais tarde."
			console.error(errorMessage)
			toast.error(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage)
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
			const errorMessage = error?.data?.message ?? "Algo deu errado. Tente novamente mais tarde."
			console.error(errorMessage)
			toast.error(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage)
			return
		}

		user.value = data.user
		company.value = data

		navigateTo("/")
	}

	async function registerCandidate(candidateData: IRegisterCandidateRequest) {
		const { data, error } = await useAPI<IRegisterCandidateResponse>("/auth/register/candidate", {
			method: "POST",
			body: JSON.stringify(candidateData),
		})

		if (error || !data) {
			const errorMessage = error?.data?.message ?? "Algo deu errado. Tente novamente mais tarde."
			console.error(errorMessage)
			toast.error(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage)
			return
		}

		user.value = data.user
		candidate.value = data

		navigateTo("/")
	}

	return { user, company, candidate, admin, login, register, registerCompany, registerCandidate }
})
