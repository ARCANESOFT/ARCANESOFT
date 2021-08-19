import { computed, ComputedRef } from 'vue'
import useData from './data'
import useMethods from './methods'
import { includes } from '../utilities'

import {
    ALL, ALL_WITH_INDETERMINATE,
    BRANCH_PRIORITY, INDEX, LEAF_PRIORITY, LEVEL,
} from '../constants'

function sortValueByLevel(a, b) {
    return a.level === b.level
        ? sortValueByIndex(a, b)
        : a.level - b.level
}

function sortValueByIndex(a, b) {
    let i = 0
    do {
        if (a.level < i) return -1
        if (b.level < i) return 1
        if (a.index[i] !== b.index[i]) return a.index[i] - b.index[i]
        i++
    } while (true)
}

type Getters = {
    hasValue:            ComputedRef<boolean>,
    isDisabled:          ComputedRef<boolean>,
    isMultiple:          ComputedRef<boolean>,
    isSingle:            ComputedRef<boolean>,
    isSearchable:        ComputedRef<boolean>,
    shouldShowCloseIcon: ComputedRef<boolean>,
    internalValue:       ComputedRef<any[]>,
}

export default (props): Getters => {
    const { forest } = useData(props)
    const { getNode } = useMethods(props, forest)

    const isDisabled = computed((): boolean => props.disabled)
    const isMultiple = computed((): boolean => props.multiple)
    const isSingle = computed((): boolean => ! props.multiple)
    const isSearchable = computed((): boolean => props.searchable)

    const isSelected = (node): boolean => {
        // whether a node is selected (single-select mode) or fully-checked (multi-select mode)
        return forest.selectedNodeMap[node.id] === true
    }
    const selectedNodes = computed(() => forest.selectedNodeIds.map(getNode))

    const internalValue = computed(() => {
        let internalValue = []

        console.log(forest)

        if (props.single || props.flat || props.disableBranchNodes || props.valueConsistsOf === ALL) {
            internalValue = forest.selectedNodeIds.slice()
        }
        else if (props.valueConsistsOf === BRANCH_PRIORITY) {
            internalValue = forest.selectedNodeIds.filter(id => {
                const node = getNode(id)

                if (node.isRootNode)
                    return true

                return ! isSelected(node.parentNode)
            })
        }
        else if (props.valueConsistsOf === LEAF_PRIORITY) {
            internalValue = forest.selectedNodeIds.filter(id => {
                const node = getNode(id)

                if (node.isLeaf)
                    return true

                return node.children.length === 0
            })
        }
        else if (props.valueConsistsOf === ALL_WITH_INDETERMINATE) {
            const indeterminateNodeIds = []
            internalValue = forest.selectedNodeIds.slice()

            selectedNodes.value.forEach((selectedNode) => {
                selectedNode.ancestors.forEach((ancestor) => {
                    if (includes(indeterminateNodeIds, ancestor.id))
                        return
                    if (includes(internalValue, ancestor.id))
                        return
                    indeterminateNodeIds.push(ancestor.id)
                })
            })

            internalValue.push(...indeterminateNodeIds)
        }

        if (props.sortValueBy === LEVEL)
            internalValue.sort((a, b) => sortValueByLevel(getNode(a), getNode(b)))
        else if (props.sortValueBy === INDEX)
            internalValue.sort((a, b) => sortValueByIndex(getNode(a), getNode(b)))

        return internalValue
    })

    const hasValue = computed((): boolean => internalValue.value.length > 0)

    const hasUndisabledValue = computed((): boolean => {
        return hasValue.value
            && internalValue.value.some(id => ! getNode(id).isDisabled)
    })

    const shouldShowCloseIcon = computed((): boolean => {
        return props.clearable
            && ! props.disabled
            && hasValue.value
            && (hasUndisabledValue.value || props.allowClearingDisabled)
    })

    return {
        hasValue,
        isDisabled,
        isMultiple,
        isSingle,
        isSearchable,
        shouldShowCloseIcon,
        internalValue,
    }
}
