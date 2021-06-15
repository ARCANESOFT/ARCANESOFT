const colors = [
    '#007BFF',
    '#6610F2',
    '#6F42C1',
    '#E83E8C',
    '#DC3545',
    '#FD7E14',
    '#FFC107',
    '#28A745',
    '#20C997',
    '#17A2B8',
]

function get(item, fallback: string): string {
    if (typeof item.color === 'string')
        return item.color

    return fallback
}

function getByIndex(index: number): string {
    const total = (colors.length - 1)

    return colors[index > total ? (index % total) : index]
}

export default {
    get,
    getByIndex,
}
