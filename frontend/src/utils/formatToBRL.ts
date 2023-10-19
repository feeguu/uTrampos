const { format: formatToBRL } = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
})

export { formatToBRL }
