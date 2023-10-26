export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useAuth()

	if (to.meta.allowedRoles) {
		if (!auth.user) {
			if ((to.meta.allowedRoles as string[] | undefined)?.includes("GUEST")) return

			return navigateTo("/login")
		}

		if ((to.meta.allowedRoles as string[] | undefined)?.includes(auth.user.type)) return
	}

	switch (auth.user?.type) {
		case "COMPANY":
			return navigateTo("/company")
			break

		case "CANDIDATE":
			return navigateTo("/jobs")
			break

		case "ADMIN":
			return navigateTo("/admin")
			break

		default:
			return navigateTo("/login")
			break
	}
})
