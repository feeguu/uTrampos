const { format } = new Intl.DateTimeFormat("pt-BR")

export function formatDate(date: string | Date) {
    return format(new Date(date))
}
