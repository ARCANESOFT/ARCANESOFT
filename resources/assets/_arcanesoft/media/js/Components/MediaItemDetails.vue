<script>
    import config from '../config';
    import events from '../events';
    import { translator } from '../mixins';

    export default {
        name: 'media-item-details',

        mixins: [translator],

        props: {
            media: {
                type: Object,
                required: true
            }
        },

        methods: {
            close() {
                window.eventHub.$emit(events.ITEM_DETAILS_CLOSED);
            },
        }
    }
</script>

<template>
    <aside id="mediaDetails" class="media-item-details">
        <div class="details-thumbnail" v-if="media.isImage()">
            <img :src="media.url">
        </div>
        <div class="item-body">
            <p>
                <b>{{ lang.get('item.attributes.name') }}: </b><br>
                <small style="word-break: break-all;">{{ media.name }}</small>
            </p>
            <p>
                <b>{{ lang.get('item.attributes.path') }}: </b><br>
                <small style="word-break: break-all;">{{ media.path }}</small>
            </p>
            <p>
                <b>{{ lang.get('item.attributes.url') }}: </b><br>
                <small style="word-break: break-all;">{{ media.url }}</small>
            </p>
            <p>
                <b>{{ lang.get('item.attributes.mimetype') }}: </b>
                <small style="word-break: break-all;">{{ media.mimetype }}</small>
            </p>
            <p>
                <b>{{ lang.get('item.attributes.size') }}: </b>
                <small>{{ media.humanFileSize() }}</small>
            </p>
            <p>
                <b>{{ lang.get('item.attributes.last_modified') }}: </b>
                <small>{{ media.lastModified }}</small>
            </p>
            <p>
                <b>{{ lang.get('item.attributes.visibility') }}: </b>
                <span class="label" :class="media.isPublic() ? 'label-success' : 'label-danger'">
                    {{ lang.get(media.isPublic() ? 'item.visibility.public' : 'item.visibility.public') }}
                </span>
            </p>
        </div>
        <div class="item-footer">
            <button class="btn btn-sm btn-default" @click="close">
                {{ lang.get('actions.close') }}
            </button>
        </div>
    </aside>
</template>
