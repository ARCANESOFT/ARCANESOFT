import autosize from 'autosize'

export default (elements: any) => {
    if (typeof elements === 'string')
        elements = document.querySelectorAll(elements)

    return autosize(elements)
}
