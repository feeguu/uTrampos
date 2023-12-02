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

import type { ICandidate, ICompany, IUser } from "~/types/roles"

export const useAuth = defineStore("auth", () => {
	const toast = useToast()

	const user = ref<IUser | null>()
	const company = ref<ICompany | null>()
	const admin = ref<boolean | null>()
	const candidate = ref<ICandidate | null>()

	async function login(loginData: ILoginRequest) {
		const { data, error } = await useAPI<IRegisterUserResponse>("/auth/login", {
			method: "POST",
			body: JSON.stringify(loginData),
		})

		if (error || !data) return

		useToken().set(data.token)

		navigateTo("/")
	}

	async function register(userData: IRegisterUserRequest) {
		const { data, error } = await useAPI<IRegisterUserResponse>("/auth/register", {
			method: "POST",
			body: JSON.stringify(userData),
		})

		if (error || !data) return

		useToken().set(data?.token)

		navigateTo("/register/" + userData.type.toLowerCase())
	}

	async function registerCompany(companyData: IRegisterCompanyRequest) {
		const { data, error } = await useAPI<IRegisterCompanyResponse>("/auth/register/company", {
			method: "POST",
			body: JSON.stringify(companyData),
		})

		if (error || !data) return

		user.value = data.user
		company.value = data

		navigateTo("/")
	}

	async function registerCandidate(candidateData: IRegisterCandidateRequest) {
		const { data, error } = await useAPI<IRegisterCandidateResponse>("/auth/register/candidate", {
			method: "POST",
			body: JSON.stringify(candidateData),
		})

		if (error || !data) return

		user.value = data.user
		candidate.value = data

		navigateTo("/")
	}

	async function logout() {
		useToken().remove()
		user.value = null
		candidate.value = null
		company.value = null
		admin.value = null
		navigateTo("/jobs")
	}

	return { user, company, candidate, admin, login, register, registerCompany, registerCandidate, logout }
})
