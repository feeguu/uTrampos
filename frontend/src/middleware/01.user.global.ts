export default defineNuxtRouteMiddleware(async (to, from) => {
	const token = useToken().get()
	const auth = useAuth()

	if (!auth.user && token) {
		const { data, error } = await useAPI<IAuthUser>("/profile")

		if (error || !data) {
			console.error(error?.data.message)
			return navigateTo("/login")
		}

		auth.user = data.user

		switch (auth.user.type) {
			case "COMPANY":
				auth.company = data as ICompany
				break

			case "CANDIDATE":
				auth.candidate = data as ICandidate
				break

			case "ADMIN":
				auth.admin = data as IAdmin
				break

			default:
				navigateTo("/login")
				break
		}
	}
})
