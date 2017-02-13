<template>
    <transition name="fade">
        <aside id="mediaDetails" class="media-item-details">
            <div class="details-thumbnail">
                <img :src="media.url" v-if="isMediaImage(media)" class="img-responsive" style="max-height: 200px;">
            </div>
            <div class="item-body">

            </div>
            <div class="item-footer">
                <button class="btn btn-sm btn-default" @click="close">Close</button>
            </div>
        </aside>
    </transition>
</template>

<script>
    import config from './../Config';
    import eventHub from './../Events';

    export default {
        props: ['media'],

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
                eventHub.$emit('item-details-closed');
            },

            isMediaImage(media) {
                if ( ! this.isMediaFile(media)) return false;

                return _.indexOf(config.supportedImages, media.mimetype) >= 0;
            },

            isMediaFile(media) {
                return media.type == 'file';
            }
        },

        computed: {
            //
        }
    }
</script>
