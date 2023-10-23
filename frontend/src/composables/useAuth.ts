import { defineStore } from "pinia"
import { IUserRegister, IUserRegisterResponse } from "~/types/api"

export const useAuth = defineStore("auth", () => {
	const user = ref(null)

	async function register(userData: IUserRegister) {
		const { data, error } = await useAPI<IUserRegisterResponse>("/auth/register", {
			method: "POST",
			body: JSON.stringify(userData),
		})

		if (error) {
			console.error(error.data.message)
			return
		}

		useToken().set(data?.token)

		navigateTo("/register/" + userData.type.toLowerCase())
	}

	return { user, register }
})
