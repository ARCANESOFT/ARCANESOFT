import { computed } from 'vue'
import loadingState from '../store/getters/loading/loading-state'

export default computed((): boolean => loadingState())
