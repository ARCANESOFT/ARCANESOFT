<script>
    import config from './../config';
    import events from './../events';
    import FormErrors from 'laravel-form-errors';
    import { translator } from './../mixins';

    export default {
        name: 'create-folder-modal',

        props: ['location'],

        mixins: [translator],

        data () {
            return {
                newDirectory: '',
                modal: null,
                submitBtn: null,
                errors: null
            }
        },

        components: {
            'media-errors': require('../Components/MediaErrors.vue')
        },

        created() {
            this.errors = new FormErrors;

            window.eventHub.$on(events.MEDIA_MODAL_NEW_FOLDER_OPEN, data => {
                this.modal     = $('div#newFolderModal');
                this.submitBtn = this.modal.find('button[type="submit"]');

                this.modal.modal('show');

                this.modal.on('shown.bs.modal', () => {
                    this.modal.find('[autofocus]').focus();
                });

                this.modal.on('hidden.bs.modal', () => {
                    this.errors.reset();
                    this.resetSubmitBtn();
                })
            });
        },

        methods: {
            createFolder(e) {
                this.disableSubmitBtn();
                this.errors.reset();
                let formData = {
                    name: this.newDirectory,
                    location: this.location
                };

                window.axios.post(`${config.endpoint}/create`, formData)
                     .then((response) => {
                         this.modal.modal('hide');
                         this.newDirectory = '';

                         window.eventHub.$emit(events.MEDIA_MODAL_CLOSED, true);
                     })
                     .catch(error => {
                         this.resetSubmitBtn();

                         this.errors.setMessages(error.response.data.errors);
                     });
            },

            disableSubmitBtn() {
                this.submitBtn.button('loading');
            },

            resetSubmitBtn() {
                this.submitBtn.button('reset');
            }
        }
    }
</script>

<template>
    <div id="newFolderModal" class="modal fade">
        <div class="modal-dialog">
            <form @submit.prevent="createFolder">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">{{ lang.get('modals.add.title') }}</h4>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="newDirectory" class="form-control" autofocus :placeholder="lang.get('placeholders.folder_name')">
                        <media-errors :errors="errors"></media-errors>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default pull-left" data-dismiss="modal">
                            {{ lang.get('actions.cancel') }}
                        </button>
                        <button type="submit" class="btn btn-sm btn-primary" :data-loading-text="lang.get('messages.loading')">
                            <i class="fa fa-fw fa-plus"></i> {{ lang.get('actions.add') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
