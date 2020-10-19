import { computed } from 'vue'
import items from './items'

export default computed((): number => items.value.length)
