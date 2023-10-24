export const useAPI = async <ResponseType>(request: string, options?: any) => {
	const token = useToken().get()

	const res = await useFetch<ResponseType>(`http://localhost:3001${request}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : "",
			...options?.headers,
		},
	})

	return {
		...res,
		data: res.data.value,
		error: res.error.value,
	}
}
