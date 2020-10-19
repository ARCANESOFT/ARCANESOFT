import { computed } from 'vue'
import getCurrentLocation from '../../store/getters/location/current-location'

export default computed((): string => getCurrentLocation().replace(/^\/+/, '')+'/')
