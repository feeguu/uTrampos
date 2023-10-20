interface IUserData {
	email: string
	password: string
	name: string
	phone: string
	zipCode: string
	type: string
}

async function registerUser(userData: IUserData) {
	try {
		const res: any = await useFetch("http://localhost:3001/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})

		const token = useCookie("utrampos.token")
		token.value = res.token

		console.log(res)

		// navigateTo("/")
	} catch (error) {
		console.error(error)
	}
}

export const useAuth = () => ({
	registerUser,
})
