<script>
    import config from './config';
    import events from './events';
    import { coerce } from './utilities';
    import { translator } from './mixins';

    export default {
        name: 'media-browser',

        mixins: [translator],

        props: {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                'default': 'text'
            },
            value: {
                type: String,
                'default': ''
            },
            className: {
                type: String,
                'default': 'form-control'
            },
            placeholder: {
                type: String,
                'default': null
            },
            disabled: {
                type: Boolean,
                coerce: coerce.boolean,
                'default': false
            },
            readonly: {
                type: Boolean,
                coerce: coerce.boolean,
                'default': false
            },
            required: {
                type: Boolean,
                coerce: coerce.boolean,
                'default': false
            }
        },

        data() {
            return {
                url: ''
            }
        },

        components: {
            'browse-media-modal':   require('./Modals/BrowseMediaModal.vue')
        },

        mounted() {
            this.url = this.value;

            window.eventHub.$on(events.MEDIA_MODAL_BROWSER_SELECT, (url) => {
                this.url = url;
            });
        },

        methods: {
            openBrowserModal() {
                window.eventHub.$emit(events.MEDIA_MODAL_BROWSER_OPEN);
            }
        }
    }
</script>

<template>
    <div>
        <div class="input-group">
            <input :name="name" :type="type" :value="url" :class="className"
                   :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :required="required">

            <span class="input-group-btn">
                <button class="btn btn-default" type="button" @click.prevent="openBrowserModal">
                    <slot>{{ lang.get('actions.browse') }}</slot>
                </button>
            </span>
        </div>

        <browse-media-modal></browse-media-modal>
    </div>
</template>
