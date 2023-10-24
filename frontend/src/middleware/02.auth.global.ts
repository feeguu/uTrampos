export default defineNuxtRouteMiddleware(async (to, from) => {
	const auth = useAuth()
	const token = useToken().get()

	const authRoutes = ["/login", "/register"]

	if (!auth.user || !token) {
		if (
			to.path.startsWith("/candidate") ||
			to.path.startsWith("/company") ||
			to.path.startsWith("/admin") ||
			to.path === "/"
		) {
			return navigateTo("/login")
		}
		return
	}

	if (
		(to.path.startsWith("/candidate") && auth.user.type !== "CANDIDATE") ||
		(to.path.startsWith("/company") && auth.user.type !== "COMPANY") ||
		(to.path.startsWith("/admin") && auth.user.type !== "ADMIN") ||
		to.path === "/" ||
		authRoutes.includes(to.path)
	) {
		return navigateTo(`/${auth.user?.type}`)
	}
})
