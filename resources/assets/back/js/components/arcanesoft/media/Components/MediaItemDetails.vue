<template>
    <aside id="mediaDetails" class="media-item-details">
        <div class="details-thumbnail">
            <img :src="media.url" v-if="media.isImage()" class="img-responsive" style="max-height: 200px;">
        </div>
        <div class="item-body">
            <p>
                <b>Name: </b><br>
                <small style="word-break: break-all;">{{ media.name }}</small>
            </p>
            <p>
                <b>Path: </b><br>
                <small style="word-break: break-all;">{{ media.path }}</small>
            </p>
            <p>
                <b>URL: </b><br>
                <small style="word-break: break-all;">{{ media.url }}</small>
            </p>
            <p>
                <b>Mimetype: </b><small style="word-break: break-all;">{{ media.mimetype }}</small>
            </p>
            <p>
                <b>Size: </b><small>{{ media.humanFileSize() }}</small>
            </p>
            <p>
                <b>Last modified: </b><small>{{ media.lastModified }}</small>
            </p>

            <p>
                <b>Visibility: </b>
                <span class="label" :class="media.isPublic() ? 'label-success' : 'label-danger'">
                    {{ media.isPublic() ? 'Public' : 'Private' }}
                </span>
            </p>
        </div>
        <div class="item-footer">
            <button class="btn btn-sm btn-default" @click="close">Close</button>
        </div>
    </aside>
</template>

<script>
    import config from './../Config';
    import events from './../Events';

    export default {
        props: {
            media: {
                type: Object,
                required: true
            }
        },

        data () {
            return {
                //
            };
        },

        created() {
            //
        },

        methods: {
            close() {
                eventHub.$emit(events.ITEM_DETAILS_CLOSED);
            },
        },

        computed: {
            //
        }
    }
</script>
