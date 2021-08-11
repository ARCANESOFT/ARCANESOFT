import { computed, defineComponent, provide, reactive } from 'vue'
import getters from '../store/getters'

import Control from './control'

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
        const {
            isSingle, isMultiple, isSearchable, shouldShowCloseIcon
        } = getters(props)

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

        provide('treeselect', {
            'props': props,
            'getters': {
                isSingle,
                isMultiple,
                isSearchable,
                shouldShowCloseIcon,
            },
            data: {menu},
        });

        return {
            wrapperClass: computed(() => ({
                'v-treeselect':             true,
                'v-treeselect--multi':      isMultiple.value,
                'v-treeselect--single':     isSingle.value,
                'v-treeselect--searchable': isSearchable.value,
                'v-treeselect--open-below': true,
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
