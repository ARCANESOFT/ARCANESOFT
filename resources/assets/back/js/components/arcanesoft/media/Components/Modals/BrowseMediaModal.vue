<script>
    import events from './../../Events';

    export default {
        components: {
            'media-manager': require('./../../MediaManager.vue')
        },

        data() {
            return {
                modal: null,
                modalOpened: false,
                selected: null
            };
        },

        mounted() {
            this.modal = $('div#media-browser-modal');

            this.modal.on('hidden.bs.modal', () => {
                this.modalOpened = false;
            });

            eventHub.$on(events.MEDIA_MODAL_BROWSER_OPEN, () => {
                this.openModal();
            }, this);

            eventHub.$on(events.MEDIA_ITEM_SELECTED, (media) => {
                this.selected = (media && media.isFile()) ? media : null;
            }, this);
        },

        computed: {
            isNotSelected() {
                return this.selected == null;
            }
        },

        methods: {
            openModal() {
                this.modalOpened = true;
                this.modal.modal('show');
            },

            closeModal() {
                this.modal.modal('hide');
            },

            selectMedia() {
                this.closeModal();
                eventHub.$emit(events.MEDIA_MODAL_BROWSER_SELECT, this.selected.url);
            }
        }
    }
</script>

<template>
    <div id="media-browser-modal" class="modal fade">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Media browser</h4>
                </div>
                <div class="modal-body no-padding">
                    <media-manager :readonly="true" v-if="modalOpened"></media-manager>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" :disabled="isNotSelected" @click.prevent="selectMedia">Select</button>
                </div>
            </div>
        </div>
    </div>
</template>
