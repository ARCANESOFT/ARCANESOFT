import { find, warning } from '../utilities'
import { NO_PARENT_NODE } from '../constants'

export default (props, forest?) => {
    const getInstanceId = () => {
        return props.instanceId == null
            ? props.id
            : props.instanceId
    }

    const getNode = (nodeId) => {
        warning(
            () => nodeId != null,
            () => `Invalid node id: ${nodeId}`,
        )

        if (nodeId == null)
            return null

        return nodeId in forest.nodeMap
            ? forest.nodeMap[nodeId]
            : createFallbackNode(nodeId)
    }

    const createFallbackNode = (id) => {
        // In case there is a default selected node that is not loaded into the tree yet,
        // we create a fallback node to keep the component working.
        // When the real data is loaded, we'll override this fake node.

        const raw = extractNodeFromValue(id)
        const label = enhancedNormalizer(raw).label || `${id} (unknown)`
        const fallbackNode = {
            id,
            label,
            ancestors: [],
            parentNode: NO_PARENT_NODE,
            isFallbackNode: true,
            isRootNode: true,
            isLeaf: true,
            isBranch: false,
            isDisabled: false,
            isNew: false,
            index: [ -1 ],
            level: 0,
            raw,
        }

        return forest.nodeMap[id] = fallbackNode
    }

    const extractNodeFromValue = (id) => {
        const defaultNode = { id }

        if (props.valueFormat === 'id')
            return defaultNode

        const valueArray = props.multiple
            ? Array.isArray(props.modelValue) ? props.modelValue : []
            : props.modelValue ? [props.modelValue] : []

        const matched = find(
            valueArray,
            node => node && enhancedNormalizer(node).id === id,
            this
        )

        return matched || defaultNode
    }

    const enhancedNormalizer = (raw) => {
        return {
            ...raw,
            ...props.normalizer(raw, getInstanceId()),
        }
    }

    const extractCheckedNodeIdsFromValue = (): Array<any> => {
        if (props.modelValue == null) return []

        if (props.valueFormat === 'id') {
            return props.multiple
                ? props.modelValue.slice()
                : [props.modelValue]
        }

        return (props.multiple ? props.modelValue : [ props.modelValue ])
            .map(node => enhancedNormalizer(node))
            .map(node => node.id)
    }

    return {
        getNode,
        enhancedNormalizer,
        extractCheckedNodeIdsFromValue,
    }
}
