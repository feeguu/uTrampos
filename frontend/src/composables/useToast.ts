interface IToast {
	id: number
	type: "error" | "success"
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

	function success(message: string) {
		toastMessages.value.push({
			id: Math.random() * (10000 - 1000) + 1000,
			type: "success",
			message,
		})
	}

	function close(id: number) {
		toastMessages.value = toastMessages.value.filter((toastMessage) => toastMessage.id !== id)
	}

	return { toastMessages, close, error, success }
})
