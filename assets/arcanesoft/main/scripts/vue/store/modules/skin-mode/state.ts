import { reactive } from 'vue'
import { SKIN_MODE } from '../../../../emuns'

export type State = {
    skinMode: SKIN_MODE|null
}

export default reactive<State>({
    skinMode: null
})
