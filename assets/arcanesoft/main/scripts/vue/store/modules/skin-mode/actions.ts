import tap from '@arcanesoft/core/src/functions/tap'
import arcanesoft from '../../../../helpers/arcanesoft'
import { SKIN_MODE } from '../../../../emuns'

const EVENT_CLASS = 'Arcanesoft\\Foundation\\Core\\Events\\UI\\SkinModeToggled'

export type Actions = {
    applySkinMode(mode: SKIN_MODE): void
}

export default (): Actions => {
    const applySkinMode = (mode: SKIN_MODE): void => {
        document.body.dataset.skinMode = mode

        // Call the API to save the skin mode
        tap(arcanesoft(), (arc) => {
            arc.request()
                .post('/admin/api/events', {
                    class: EVENT_CLASS,
                    options: {mode},
                })
                .then(() => {})

            arc.emit('foundation.ui.skin', {mode})
        })
    }

    return {
        applySkinMode,
    }
}
