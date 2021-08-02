import './vendors'
import './components'

import arcanesoft from './classes/arcanesoft'

const app = arcanesoft({
    vue: {
        rootContainer: '#arcanesoft',
    },
})

app.on('arcanesoft::started', () => {
    app.bootComponents(document)
})
