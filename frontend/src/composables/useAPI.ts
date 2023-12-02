export const useAPI = async <ResponseType>(request: string, options?: any) => {
	const token = useToken().get()
	const toast = useToast()

	const res = await useFetch<ResponseType>(`https://utrampos.azurewebsites.net${request}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : "",
			...options?.headers,
		},
	})

	if (res.error.value) {
		const errorMessage = res.error.value?.data?.message ?? "Algo deu errado. Tente novamente mais tarde."
		console.error(errorMessage)
		toast.error(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage)
	}

	return {
		...res,
		data: res.data.value,
		error: res.error.value,
	}
}
