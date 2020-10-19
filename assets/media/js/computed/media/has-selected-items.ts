import { computed } from 'vue'
import { isNotEmpty as hasSelectedItems } from '../../store/getters/media/selected-media-items'

export default computed((): boolean => hasSelectedItems())
