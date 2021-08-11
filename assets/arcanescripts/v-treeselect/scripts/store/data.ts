import { reactive } from 'vue'
import { createMap } from '../utilities'

export default (props) => {
    const getInstanceId = () => {
        return props.instanceId == null ? props.id : props.instanceId
    }

    const extractCheckedNodeIdsFromValue = () => {
        if (props.modelValue == null) return []

        if (props.valueFormat === 'id') {
            return props.multiple
                ? props.modelValue.slice()
                : [ props.modelValue ]
        }

        return (props.multiple ? props.modelValue : [ props.modelValue ])
            .map(node => enhancedNormalizer(node))
            .map(node => node.id)
    }

    const enhancedNormalizer = (raw) => {
        return {
            ...raw,
            ...props.normalizer(raw, getInstanceId()),
        }
    }

    const menu = reactive({
        // Is the menu opened?
        isOpen: false,
        // Id of current highlighted option.
        current: null,
        // The scroll position before last menu closing.
        lastScrollPosition: 0,
        // Which direction to open the menu.
        placement: 'bottom',
    })

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

    return {
        forest,
        menu,
    }
}
