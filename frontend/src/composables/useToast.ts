interface IToast {
	id: number
	type: "error"
	message: string
}

export const useToast = defineStore("toast", () => {
	const toastMessages = ref<IToast[]>([])

	function error(message: string) {
		toastMessages.value.push({
			id: Math.random() * (10000 - 1000) + 1000,
			type: "error",
			message,
		})
	}

	function close(id: number) {
		toastMessages.value = toastMessages.value.filter((toastMessage) => toastMessage.id !== id)
	}

	return { toastMessages, close, error }
})
