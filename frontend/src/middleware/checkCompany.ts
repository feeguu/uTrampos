export default defineNuxtRouteMiddleware(async (to, from) => {
	const auth = useAuth()

    if (!auth.user) return navigateTo("/login")

    if (auth.user.type !== "COMPANY") {
        if (auth.user.type === "ADMIN") return navigateTo("/admin")
        if (auth.user.type === "CANDIDATE") return navigateTo("/jobs")
    }
})
