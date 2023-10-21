export const useToken = () => {
	const token = useCookie("utrampos.token")

	function get() {
		return token.value
	}

	function set(value: string) {
		token.value = value
	}

	function remove() {
		token.value = null
	}

	return {
		get,
		set,
		remove,
	}
}
