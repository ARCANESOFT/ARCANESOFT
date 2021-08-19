import { computed, defineComponent, provide } from 'vue'
import useGetters from '../store/getters'
import useData from '../store/data'

import Control from './control'
import { MENU_PLACEMENT } from "../enums";

export default defineComponent({
    name: 'v-treeselect',

    props: {
        /**
         * Whether the menu should be always open.
         */
        alwaysOpen: {
            type: Boolean,
            default: false,
        },

        /**
         * Append the menu to <body />?
         */
        appendToBody: {
            type: Boolean,
            default: false,
        },

        /**
         * Show an "×" button that resets value?
         */
        clearable: {
            type: Boolean,
            default: true,
        },

        /**
         * Title for the "×" button when `multiple: true`.
         */
        clearAllText: {
            type: String,
            default: 'Clear all',
        },

        /**
         * Whether to clear the search input after selecting.
         * Use only when `multiple` is `true`.
         * For single-select mode, it **always** clears the input after selecting an option regardless of the prop value.
         */
        clearOnSelect: {
            type: Boolean,
            default: false,
        },

        /**
         * Title for the "×" button.
         */
        clearValueText: {
            type: String,
            default: 'Clear value',
        },

        /**
         * Whether to close the menu after selecting an option?
         * Use only when `multiple` is `true`.
         */
        closeOnSelect: {
            type: Boolean,
            default: true,
        },

        /**
         * Prevent branch nodes from being selected?
         */
        disableBranchNodes: {
            type: Boolean,
            default: false,
        },

        /**
         * Disable the control?
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * Disable the fuzzy matching functionality?
         */
        disableFuzzyMatching: {
            type: Boolean,
            default: false,
        },

        /**
         * Text displayed when loading options.
         */
        loadingText: {
            type: String,
            default: 'Loading...',
        },

        /**
         * Set `true` to allow selecting multiple options (a.k.a., multi-select mode).
         */
        multiple: {
            type: Boolean,
            default: false,
        },

        /**
         * Generates a hidden <input /> tag with this field name for html forms.
         */
        name: {
            type: String,
            required: true,
        },

        /**
         * Text displayed when a branch node has no children.
         */
        noChildrenText: {
            type: String,
            default: 'No sub-options.',
        },

        /**
         * Text displayed when there are no available options.
         */
        noOptionsText: {
            type: String,
            default: 'No options available.',
        },

        /**
         * Text displayed when there are no matching search results.
         */
        noResultsText: {
            type: String,
            default: 'No results found...',
        },

        /**
         * Array of available options.
         * @type {node[]}
         */
        options: {
            type: Array,
        },

        /**
         * Field placeholder, displayed when there's no value.
         */
        placeholder: {
            type: String,
            default: 'Select...',
        },

        /**
         * Applies HTML5 required attribute when needed.
         */
        required: {
            type: Boolean,
            default: false,
        },

        /**
         * Enable searching feature?
         */
        searchable: {
            type: Boolean,
            default: true,
        },
    },

    components: {
        Control,
    },

    setup(props) {
        const getters = useGetters(props)
        const data = useData(props)

        provide('treeselect', {
            props,
            getters,
            data,
        });

        return {
            wrapperClass: computed(() => ({
                'v-treeselect':                        true,
                'v-treeselect--multi':                 getters.isMultiple.value,
                'v-treeselect--single':                getters.isSingle.value,
                'v-treeselect--searchable':            getters.isSearchable.value,
                'v-treeselect--disabled':              getters.isDisabled.value,
                'v-treeselect--open':                  data.menu.isOpen,
                'v-treeselect--open-above':            data.menu.placement === MENU_PLACEMENT.UP,
                'v-treeselect--open-below':            data.menu.placement === MENU_PLACEMENT.BOTTOM,
                'v-treeselect--focused':               data.trigger.isFocused,
                'v-treeselect--has-value':             getters.hasValue.value,
                'v-treeselect--branch-nodes-disabled': props.disableBranchNodes,
                'v-treeselect--append-to-body':        props.appendToBody,
            })),
        }
    },

    template: `
        <h3>Treeselect placeholder</h3>
        <div ref="wrapper" :class="wrapperClass">
            <Control/>
        </div>
    `,
})
