export default defineNuxtRouteMiddleware((to, from) => {
    const {value: token} = useCookie("utrampos.token")

    const publicRoutes = ["/login", "/register"]

    if(!publicRoutes.includes(to.path) && !token)
        return navigateTo("/login")

    if(publicRoutes.includes(to.path) && token)
        return navigateTo("/")
})