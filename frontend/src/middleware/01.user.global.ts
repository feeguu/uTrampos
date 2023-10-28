import type { IAdmin, IAuthUser, ICandidate, ICompany } from "~/types/roles"

export default defineNuxtRouteMiddleware(async (to, from) => {
	const token = useToken().get()
	const auth = useAuth()

	if (!auth.user && token) {
		const { data, error } = await useAPI<IAuthUser>("/profile")

		if (error || !data) {
			console.error(error?.data.message)
			useToken().remove()
			navigateTo("/login")
			return
		}

		auth.user = data.user

		auth.candidate = data.candidate
		auth.company = data.company
		auth.admin = data.admin
	}
})
