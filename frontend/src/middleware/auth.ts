export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useAuth()

	if (to.meta.allowedRoles) {
		if (!auth.user) {
			if ((to.meta.allowedRoles as string[] | undefined)?.includes("GUEST")) return

			return navigateTo("/login")
		}

		if ((to.meta.allowedRoles as string[] | undefined)?.includes(auth.user.type)) return
	}

	if (!auth.user) return navigateTo("/login")
	if (auth.candidate) return navigateTo("/jobs")
	if (auth.company) return navigateTo("/company")
	if (auth.admin) return navigateTo("/admin")
	if (auth.user.type === "CANDIDATE") return navigateTo("/register/candidate")
	if (auth.user.type === "COMPANY") return navigateTo("/register/company")
})
