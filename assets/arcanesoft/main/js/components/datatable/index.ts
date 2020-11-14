import useArcanesoft from '../../helpers/arcanesoft'

export default (name: string) => {
    const arcanesoft = useArcanesoft()

    const reload = (): void => {
        arcanesoft.emit('arcanesoft::datatable.reload', {name})
    }

    return {
        reload,
    }
}
