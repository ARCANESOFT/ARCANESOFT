<script>
    import config from './../config';
    import events from './../events';
    import { translator } from './../mixins';

    export default {
        name: 'delete-media-modal',

        mixins: [translator],

        props: ['media'],

        data() {
            return {
                modal: null,
                submitBtn: null
            }
        },

        created() {
            window.eventHub.$on(events.MEDIA_MODAL_DELETE_OPEN, data => {
                this.modal     = $('div#deleteFolderModal');
                this.submitBtn = this.modal.find('button[type="submit"]');

                this.modal.modal({
                    backdrop: 'static',
                    keyboard: false
                });
            });
        },

        methods: {
            deleteFolder(e) {
                this.disableSubmitButton();

                axios.post(`${config.endpoint}/delete`, {media: this.media})
                    .then(response => {
                        if (response.data.status === 'success') {
                            this.modal.modal('hide');
                            this.resetSubmitButton();
                            window.eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);
                        }
                        else {
                            // Throw an error
                        }
                    })
                    .catch(error => {
                        this.resetSubmitButton();
                        this.errors = error.response.data.errors;
                    });
            },

            disableSubmitButton() {
                this.submitBtn.button('loading');
            },

            resetSubmitButton() {
                this.submitBtn.button('reset');
            }
        }
    }
</script>

<template>
    <div id="deleteFolderModal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="deleteFolder">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">{{ lang.get('modals.delete.title') }}</h4>
                    </div>
                    <div class="modal-body">
                        <p v-html="lang.get('modals.delete.message', {path: media.path})"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            {{ lang.get('actions.cancel') }}
                        </button>
                        <button type="submit" class="btn btn-sm btn-danger"
                                :data-loading-text="lang.get('messages.loading')">
                            <i class="fa fa-fw fa-trash-o"></i> {{ lang.get('actions.delete') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
