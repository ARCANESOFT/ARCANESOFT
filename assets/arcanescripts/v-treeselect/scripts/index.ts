import { App } from 'vue'
import Treeselect from './components/treeselect'

export default {
    install: (app: App): void  => {
        app.component(Treeselect.name, Treeselect)
    },
}
