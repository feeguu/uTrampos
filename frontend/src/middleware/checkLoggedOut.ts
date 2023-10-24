export default defineNuxtRouteMiddleware(async (to, from) => {
	const auth = useAuth()

    if (!auth.user) return

	if (auth.user.type === "CANDIDATE") return navigateTo("/jobs")
	if (auth.user.type === "COMPANY") return navigateTo("/company")
	if (auth.user.type === "ADMIN") return navigateTo("/admin")
})
