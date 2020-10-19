import state from '../../state'
import { MediaItem } from '../../../types'

const selected = (): Array<MediaItem> => state.selectedMediaItem

const count = (): number => selected().length
const isNotEmpty = (): boolean => count() > 0
const isEmpty = (): boolean => ! isNotEmpty()

export { count, isEmpty, isNotEmpty }

export default selected
