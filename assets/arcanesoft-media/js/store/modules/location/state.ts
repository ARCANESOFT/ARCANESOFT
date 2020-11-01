import { reactive } from 'vue'

export type State = {
    location: string
}

export default reactive<State>({
    location: '/',
})
