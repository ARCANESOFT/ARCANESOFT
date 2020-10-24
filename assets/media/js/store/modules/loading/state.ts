import { reactive } from 'vue'

export type State = {
    loading: boolean
}

export default reactive<State>({
    loading: false,
})
