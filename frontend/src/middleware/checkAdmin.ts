export default defineNuxtRouteMiddleware(async (to, from) => {
	const auth = useAuth()

    if (!auth.user) return navigateTo("/login")

    if (auth.user.type !== "ADMIN") {
        if (auth.user.type === "COMPANY") return navigateTo("/company")
        if (auth.user.type === "CANDIDATE") return navigateTo("/jobs")
    }
})
