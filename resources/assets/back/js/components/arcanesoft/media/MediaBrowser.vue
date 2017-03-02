<script>
    import config from './Config';
    import events from './Events';
    import { coerce } from './Utils';

    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: String,
                default: ''
            },
            className: {
                type: String,
                default: 'form-control'
            },
            placeholder: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                coerce: coerce.boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                coerce: coerce.boolean,
                default: false
            },
            required: {
                type: Boolean,
                coerce: coerce.boolean,
                default: false
            }
        },

        components: {
            'browse-media-modal':   require('./Components/Modals/BrowseMediaModal.vue')
        },

        data() {
            return {
                url: '',
            }
        },

        mounted() {
            this.url = this.value;

            eventHub.$on(events.MEDIA_MODAL_BROWSER_SELECT, (url) => {
                this.url = url;
            });
        },

        methods: {
            openBrowserModal() {
                eventHub.$emit(events.MEDIA_MODAL_BROWSER_OPEN);
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
                    <slot>Browse Media</slot>
                </button>
            </span>
        </div>

        <browse-media-modal></browse-media-modal>
    </div>
</template>
