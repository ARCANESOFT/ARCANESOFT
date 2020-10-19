import { computed } from 'vue'
import selectedItems from './selected-items'

export default computed((): number => selectedItems.value.length)
