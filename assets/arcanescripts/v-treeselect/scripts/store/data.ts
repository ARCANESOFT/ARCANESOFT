import { reactive } from 'vue'
import { createMap } from '../utilities'
import useMethods from './methods'
import { MENU_PLACEMENT } from "../enums";

export default (props) => {
    const { extractCheckedNodeIdsFromValue } = useMethods(props)

    const forest = reactive({
        // Normalized options.
        normalizedOptions: [],
        // <id, node> map for quick look-up.
        nodeMap: createMap(),
        // <id, checkedState> map, used for multi-select mode.
        checkedStateMap: createMap(),
        // Id list of all selected options.
        selectedNodeIds: extractCheckedNodeIdsFromValue(),
        // <id, true> map for fast checking:
        //   if (forest.selectedNodeIds.indexOf(id) !== -1) forest.selectedNodeMap[id] === true
        selectedNodeMap: createMap(),
    })

    const menu = reactive({
        // Is the menu opened?
        isOpen: false,
        // Id of current highlighted option.
        current: null,
        // The scroll position before last menu closing.
        lastScrollPosition: 0,
        // Which direction to open the menu.
        placement: MENU_PLACEMENT.BOTTOM,
    })

    const trigger = reactive({
        // Is the control focused?
        isFocused: false,
        // User entered search query - value of the input.
        searchQuery: '',
    })

    return {
        forest,
        menu,
        trigger,
    }
}
